import { BaseService } from "@shared/services/base.service";
import { Leaderboard, LeaderboardInstance } from "./leaderboard.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { COMPETITION_POSITION_PER_PAGE } from "@config/constants/items-per-page";
import { DB_Errors } from "@shared/errors/db-errors";
import { Op } from "sequelize";

class _LeaderboardService extends BaseService<LeaderboardInstance> {
  protected OFFSET = createOffsetFn(COMPETITION_POSITION_PER_PAGE);

  constructor() {
    super(Leaderboard);
  }

  getTop = async (eventId: string) => {
    const leaderboard = await Leaderboard.findAll({
      where: { eventId },
      limit: COMPETITION_POSITION_PER_PAGE,
      order: [["points", "desc"]],
    });

    return leaderboard.map((l) => l.plain);
  };

  getRegistrationStatus = async (eventIds: string[], userIds: string[]) => {
    const leaderboardModels = await Leaderboard.findAll({
      where: {
        eventId: { [Op.in]: eventIds },
        userId: { [Op.in]: userIds },
      },
    });

    const leaderboardMap = new Set(
      leaderboardModels.map((l: any) => `${l.userId}|${l.eventId}`)
    );

    return (userId: string, eventId: string) => {
      const key = `${userId}|${eventId}`;
      return leaderboardMap.has(key);
    };
  };

  register = async (eventId: string, userId: string) => {
    return await this.create({ userId, eventId });
  };

  getByUserIdAndEventId = async (eventId: string, userId: string) => {
    const leaderboard = await Leaderboard.findOne({
      where: { userId, eventId },
    });
    if (!leaderboard) throw DB_Errors.notFound;

    return leaderboard;
  };

  unregister = async (eventId: string, userId: string) => {
    const leaderboard = await this.getByUserIdAndEventId(eventId, userId);
    await leaderboard.destroy();
    return leaderboard.plain;
  };

  increasePoint = async (amount: number, eventId: string, userId: string) => {
    if (amount === 0) return;

    if (amount > 0)
      await Leaderboard.increment(
        { points: amount },
        { where: { eventId, userId } }
      );
    else
      await Leaderboard.decrement(
        { points: Math.abs(amount) },
        { where: { eventId, userId } }
      );
  };
}

export const LeaderboardService = new _LeaderboardService();
