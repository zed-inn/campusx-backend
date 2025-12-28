import { Includeable } from "sequelize";
import { Follow, FollowInstance } from "../models/follow.model";
import { Profile } from "../models/profile.model";
import { FOLLOW_CONFIG } from "../profile.config";
import db from "@config/database";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { ProfileInclude, ProfileService } from "./profile.service";
import { Rui } from "@shared/dtos/req-user.dto";
import { FollowSchema } from "../dtos/service/follow-schema.dto";

export class FollowService extends BaseService<FollowInstance> {
  protected static FOLLOWS_PER_PAGE = 30;
  protected static OFFSET = createOffsetFn(this.FOLLOWS_PER_PAGE);

  override get data() {
    const follow = super.data;
    follow.followerProfile = ProfileService.parse(follow.followerProfile);
    follow.followeeProfile = ProfileService.parse(follow.followeeProfile);
    return FollowSchema.parse(follow);
  }

  static getFollowersById = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const followers = await Follow.findAll({
      where: { followeeId: id },
      offset: this.OFFSET(page),
      limit: this.FOLLOWS_PER_PAGE,
      include: [
        FollowInclude.followeeProfile(reqUserId),
        FollowInclude.followerProfile(reqUserId),
      ],
    });

    return followers.map((f) => new FollowService(f));
  };

  static getFollowingsById = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const following = await Follow.findAll({
      where: { followerId: id },
      offset: this.OFFSET(page),
      limit: this.FOLLOWS_PER_PAGE,
      include: [
        FollowInclude.followeeProfile(reqUserId),
        FollowInclude.followerProfile(reqUserId),
      ],
    });

    return following.map((f) => new FollowService(f));
  };

  static follow = async (followeeId: string, followerId: string) => {
    await db.transaction(async () => {
      await Follow.create({
        followeeId,
        followerId,
        status: FOLLOW_CONFIG.STATUS.ACTIVE,
      });

      await Profile.increment(
        { followersCount: 1 },
        { where: { id: followeeId } }
      );
      await Profile.increment(
        { followingCount: 1 },
        { where: { id: followerId } }
      );
    });
  };

  static unfollow = async (followeeId: string, followerId: string) => {
    await db.transaction(async () => {
      await Follow.destroy({
        where: {
          followeeId,
          followerId,
        },
      });

      await Profile.decrement(
        { followersCount: 1 },
        { where: { id: followeeId } }
      );
      await Profile.decrement(
        { followingCount: 1 },
        { where: { id: followerId } }
      );
    });
  };
}

class FollowInclude {
  static followerProfile = (id?: Rui): Includeable => ({
    model: Profile,
    as: "followerProfile",
    include: [ProfileInclude.followedBy(id), ProfileInclude.ambassador],
  });

  static followeeProfile = (id?: Rui): Includeable => ({
    model: Profile,
    as: "followeeProfile",
    include: [ProfileInclude.followedBy(id), ProfileInclude.ambassador],
  });
}
