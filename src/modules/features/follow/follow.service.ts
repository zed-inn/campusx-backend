import db from "@config/database";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import { Follow, FollowInstance } from "./follow.model";
import { FollowErrors } from "./follow.errors";
import { Op } from "sequelize";
import { FollowGetDto } from "./dtos/follow-get.dto";
import { ProfileService } from "@modules/core/profile";
import { FollowStatService } from "./stat/stat.service";

class _FollowService extends BaseService<FollowInstance> {
  protected OFFSET = createOffsetFn(USERS_PER_PAGE);

  constructor() {
    super(Follow);
  }

  getFollowStatus = async (followeeIds: string[], followerIds: string[]) => {
    const followModels = await Follow.findAll({
      where: {
        followerId: { [Op.in]: followerIds },
        followeeId: { [Op.in]: followeeIds },
      },
    });

    const followMap = new Set(
      followModels.map((f: any) => `${f.followeeId}|${f.followerId}`)
    );

    return (followerId: string, followeeId: string) => {
      const key = `${followeeId}|${followerId}`;
      return followMap.has(key);
    };
  };

  getFollowersById = async ({ userId, page }: FollowGetDto) => {
    const follows = await Follow.findAll({
      where: { followeeId: userId },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
    });
    const followsMap = follows.map((f) => f.plain);

    return await ProfileService.getByIds(followsMap.map((f) => f.followerId));
  };

  getFollowingsById = async (id: string, page: number) => {
    const follows = await Follow.findAll({
      where: { followerId: id },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
    });
    const followsMap = follows.map((f) => f.plain);

    return await ProfileService.getByIds(followsMap.map((f) => f.followeeId));
  };

  follow = async (followeeId: string, followerId: string) => {
    if (followeeId === followerId) throw FollowErrors.followSelf;

    await db.transaction(async () => {
      await Follow.create({ followeeId, followerId });

      // TODO: notify other user
      await FollowStatService.updateCounts(followeeId, "followers", 1);
      await FollowStatService.updateCounts(followerId, "following", 1);
    });
  };

  unfollow = async (followeeId: string, followerId: string) => {
    if (followeeId === followerId) throw FollowErrors.unfollowSelf;

    await db.transaction(async () => {
      const deleted = await Follow.destroy({
        where: { followeeId, followerId },
      });

      if (deleted > 0) {
        await FollowStatService.updateCounts(followeeId, "followers", -1);
        await FollowStatService.updateCounts(followerId, "following", -1);
      }
    });
  };
}

export const FollowService = new _FollowService();
