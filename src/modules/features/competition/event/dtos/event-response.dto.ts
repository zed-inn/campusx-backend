import { z } from "zod";
import { EventModel } from "../event.model";

export const EventSchema = EventModel.dbSchema.extend({
  isRegistered: z.boolean().default(false),
});

export type EventDto = z.infer<typeof EventSchema>;
