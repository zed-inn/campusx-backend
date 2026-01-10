import { z } from "zod";
import { EventModel } from "../../event/event.model";

export const LeaderboardGetTopSchema = z.object({
  eventId: EventModel.fields.id,
});

export type LeaderboardGetTopDto = z.infer<typeof LeaderboardGetTopSchema>;
