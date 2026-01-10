import { z } from "zod";
import { EventModel } from "../../event/event.model";

export const LeaderboardRegisterSchema = z.object({
  eventId: EventModel.fields.id,
});

export type LeaderboardRegisterDto = z.infer<typeof LeaderboardRegisterSchema>;

export const LeaderboardUnregisterSchema = z.object({
  eventId: EventModel.fields.id,
});

export type LeaderboardUnregisterDto = z.infer<
  typeof LeaderboardUnregisterSchema
>;
