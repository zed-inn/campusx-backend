import { Includeable } from "sequelize";
import { Follow } from "../models/follow.model";
import { Profile } from "../models/profile.model";
import { FOLLOW_CONFIG } from "../profile.config";
import { FollowFullSchema as FollowFS } from "../dtos/follow-full.dto";

export class FollowService {
  static FOLLOW_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.FOLLOW_PER_PAGE;

  static getFollowersById = async (id: string, page: number) => {
    const followers = await Follow.findAll({
      where: { followeeId: id },
      offset: this.OFFSET(page),
      limit: this.FOLLOW_PER_PAGE,
      include: [FollowInclude.followerProfile, FollowInclude.followeeProfile],
    });

    return followers.map((f) => FollowFS.parse(f.get({ plain: true })));
  };

  static getFollowingById = async (id: string, page: number) => {
    const following = await Follow.findAll({
      where: { followerId: id },
      offset: this.OFFSET(page),
      limit: this.FOLLOW_PER_PAGE,
      include: [FollowInclude.followerProfile, FollowInclude.followeeProfile],
    });

    return following.map((f) => FollowFS.parse(f.get({ plain: true })));
  };

  static follow = async (id: string, reqUserId: string) => {
    await Follow.create({
      followeeId: id,
      followerId: reqUserId,
      status: FOLLOW_CONFIG.STATUS.ACTIVE,
    });
  };

  static unfollow = async (id: string, reqUserId: string) => {
    await Follow.destroy({
      where: {
        followeeId: id,
        followerId: reqUserId,
      },
    });
  };
}

class FollowInclude {
  static get followerProfile(): Includeable {
    return { model: Profile, as: "followerProfile" };
  }

  static get followeeProfile(): Includeable {
    return { model: Profile, as: "followeeProfile" };
  }
}
