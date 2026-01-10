import { LeaderboardService } from "../leaderboard/leaderboard.service";
import { EventSchema } from "./dtos/event-response.dto";
import { EventAttributes } from "./event.model";

export type IncompleteEvent = EventAttributes & { isRegistered?: boolean };

export class EventAggregator {
  static addIsRegistered = async (
    events: IncompleteEvent[],
    reqUserId: string | null = null
  ) => {
    if (!reqUserId) return events;

    const eventIds = events.map((e) => e.id);
    const isRegistered = await LeaderboardService.getRegistrationStatus(
      eventIds,
      [reqUserId]
    );

    return events.map((e) => ({
      ...e,
      isRegistered: isRegistered(reqUserId, e.id),
    }));
  };

  static transfrom = async (
    events: IncompleteEvent[],
    reqUserId?: string | null
  ) => {
    const withIsRegistered = await EventAggregator.addIsRegistered(
      events,
      reqUserId
    );

    return withIsRegistered.map((e) => EventSchema.parse(e));
  };
}
