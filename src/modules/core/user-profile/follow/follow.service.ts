import db from "@config/database";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { USERS_PER_PAGE } from "@config/constants/items-per-page";
import {
  Profile,
  ProfileAttributes,
  ProfileInstance,
} from "../profile/profile.model";
import { Follow } from "./follow.model";
import { ProfileService } from "../profile/profile.service";
import { FOLLOW_STATUS } from "./follow.constants";

export class FollowService extends BaseService<
  ProfileInstance,
  ProfileAttributes
> {
  protected static OFFSET = createOffsetFn(USERS_PER_PAGE);

  /**
   * Gives result in format followerId-followeeId : true/false
   */
  static getFollowStatus = async (
    followeeIds: string[],
    followerIds: string[]
  ) => {
    let followStatus: Record<string, boolean> = {};
    for (const id of followerIds) {
      const follows = await Follow.findAll({
        where: { followeeId: followeeIds, followerId: id },
      });
      follows.map(
        (f: any) => (followStatus[`${f.followerId}-${f.followeeId}`] = true)
      );
    }

    return (followerId: string, followeeId: string) => {
      const follows = followStatus[`${followerId}-${followeeId}`];
      return follows ? true : false;
    };
  };

  static getFollowersById = async (id: string, page: number) => {
    const follows = await Follow.findAll({
      where: { followeeId: id },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
    });
    const profileIds = follows.map((f: any) => f.followerId);

    return ProfileService.getByIds(profileIds);
  };

  static getFollowingsById = async (id: string, page: number) => {
    const follows = await Follow.findAll({
      where: { followerId: id },
      offset: this.OFFSET(page),
      limit: USERS_PER_PAGE,
    });
    const profileIds = follows.map((f: any) => f.followeeId);

    return ProfileService.getByIds(profileIds);
  };

  static follow = async (followeeId: string, followerId: string) => {
    await db.transaction(async () => {
      await Follow.create({
        followeeId,
        followerId,
        status: FOLLOW_STATUS.ACTIVE,
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
        where: { followeeId, followerId },
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
