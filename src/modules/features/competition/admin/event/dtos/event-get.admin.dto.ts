import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { EventModel } from "@modules/features/competition/event/event.model";
 
export const EventFiltersSchema = EventModel.dbSchema.partial();

export type EventFiltersDto = z.infer<typeof EventFiltersSchema>;

export const EventGetFilterSchema = EventFiltersSchema.extend({
page: GlobalSchema.fields.page,
order: GlobalSchema.fields.order,
});

export type EventGetFilterDto = z.infer<typeof EventGetFilterSchema>;
