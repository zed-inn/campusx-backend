import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { LeaderboardAttributes } from "./leaderboard.model";
import { LeaderboardSchema } from "./dtos/leaderboard-response.dto";

export type IncompleteLeaderboard = LeaderboardAttributes & {
  user?: Record<string, unknown>;
};

export class LeaderboardAggregator {
  static addUser = async (
    leaderboards: IncompleteLeaderboard[],
    reqUserId?: string | null
  ) => {
    const userIds = leaderboards.map((l) => l.userId);

    const iUsers = await ProfileService.getByIds(userIds);
    const tUsers = await ProfileAggregator.transform(iUsers, reqUserId);
    const userMap: Record<string, any> = {};
    tUsers.map((u) => (userMap[u.id] = u));

    return leaderboards.map((l) => ({ ...l, user: userMap[l.userId] }));
  };

  static transform = async (
    leaderboards: IncompleteLeaderboard[],
    reqUserId?: string | null
  ) => {
    const withUser = await LeaderboardAggregator.addUser(
      leaderboards,
      reqUserId
    );

    return withUser.map((l) => LeaderboardSchema.parse(l));
  };
}
