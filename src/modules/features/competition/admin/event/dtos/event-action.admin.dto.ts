import { EventModel } from "@modules/features/competition/event/event.model";
import { z } from "zod";

export const EventCreateSchema = EventModel.dbFields.omit({ id: true });

export type EventCreateDto = z.infer<typeof EventCreateSchema>;

export const EventUpdateSchema = EventModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: EventModel.fields.id });

export type EventUpdateDto = z.infer<typeof EventUpdateSchema>;

export const EventDeleteSchema = EventModel.dbSchema.pick({ id: true });

export type EventDeleteDto = z.infer<typeof EventDeleteSchema>;
