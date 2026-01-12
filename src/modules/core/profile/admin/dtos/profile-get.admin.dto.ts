import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { ProfileModel } from "../../profile.model";

export const ProfileFiltersSchema = ProfileModel.dbSchema.partial();

export type ProfileFiltersDto = z.infer<typeof ProfileFiltersSchema>;

export const ProfileGetFilterSchema = ProfileFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type ProfileGetFilterDto = z.infer<typeof ProfileGetFilterSchema>;
