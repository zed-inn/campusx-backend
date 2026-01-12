import { EventModel } from "@modules/features/competition/event/event.model";
import { z } from "zod";

export const EventSchema = EventModel.dbSchema;

export type EventDto = z.infer<typeof EventSchema>;
