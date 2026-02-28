import { Reaction } from "@modules/features/forums/reactions/reaction.model";
import { EventService } from "../event/event.service";
import { LeaderboardService } from "../leaderboard/leaderboard.service";

export const LikeEventHook = () => {
  Reaction.afterCreate(async (like) => {
    const comps = await EventService.getById(
      "43b020c9-624f-4b6b-9948-d5158ee772ab",
    );
    const event = comps.plain;
    const dateNow = Date.now();

    if (dateNow >= event.startDate && dateNow <= event.endDate) {
      try {
        const leaderboardUser = await LeaderboardService.getByUserIdAndEventId(
          event.id,
          like.plain.userId,
        );
        leaderboardUser.increment("points", { by: 1 });
      } catch {
        await LeaderboardService.register(event.id, like.plain.userId);
      }
    }
  });
};
