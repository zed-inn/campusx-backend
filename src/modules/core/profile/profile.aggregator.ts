import { ProfileAttributes } from "./profile.model";
import { UserSchema } from "./dtos/profile-response.dto";
import { FollowService, FollowStatService } from "@modules/features/follow";
import {
  AmbassadorAggregator,
  AmbassadorService,
} from "@modules/features/ambassador";

export type IncompleteUser = ProfileAttributes & {
  isFollowed?: boolean;
  stats?: { followers: number; following: number };
  ambassadorOf?: null | {};
};

export class ProfileAggregator {
  static addIsFollowed = async (
    users: IncompleteUser[],
    reqUserId: string | null = null
  ) => {
    if (!reqUserId) return users;

    const follows = await FollowService.getFollowStatus(
      users.map((u) => u.id),
      [reqUserId]
    );

    return users.map((u) => ({ ...u, isFollowed: follows(reqUserId, u.id) }));
  };

  static addFollowStats = async (users: IncompleteUser[]) => {
    const followStats = await FollowStatService.getByIds(
      users.map((u) => u.id)
    );

    const followMapStats: Record<
      string,
      { followers: number; following: number }
    > = {};
    for (const f of followStats)
      followMapStats[f.id] = { followers: f.followers, following: f.following };

    return users.map((u) => ({
      ...u,
      stats: followMapStats[u.id] ?? { followers: 0, following: 0 },
    }));
  };

  static addAmbassadorInstitute = async (users: IncompleteUser[]) => {
    const userIds = users.map((u) => u.id);

    const iAmbassadors = await AmbassadorService.getByUserIds(userIds);
    const tAmbassadors = await AmbassadorAggregator.transform(iAmbassadors);

    const ambassadorMap: Record<string, any> = {};
    tAmbassadors.map((a) => (ambassadorMap[a.userId] = a.institute));

    return users.map((u) => ({
      ...u,
      ambassadorOf: ambassadorMap[u.id] ?? null,
    }));
  };

  static transform = async (
    users: IncompleteUser[],
    reqUserId: string | null = null
  ) => {
    const usersAddIsFollowed = await ProfileAggregator.addIsFollowed(
      users,
      reqUserId
    );
    const usersAddFollowStats = await ProfileAggregator.addFollowStats(
      usersAddIsFollowed
    );
    const usersAddAmbassadorInstitute = await ProfileAggregator.addFollowStats(
      usersAddFollowStats
    );

    return usersAddAmbassadorInstitute.map((u) => UserSchema.parse(u));
  };
}
