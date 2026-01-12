import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { AmbassadorModel } from "../../ambassador.model";

export const AmbassadorFiltersSchema = AmbassadorModel.dbSchema.partial();

export type AmbassadorFiltersDto = z.infer<typeof AmbassadorFiltersSchema>;

export const AmbassadorGetFilterSchema = AmbassadorFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type AmbassadorGetFilterDto = z.infer<typeof AmbassadorGetFilterSchema>;
