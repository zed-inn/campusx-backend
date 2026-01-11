import { z } from "zod";
import { InstituteModel } from "../../institute.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const InstituteFiltersSchema = InstituteModel.dbSchema.partial();

export type InstituteFiltersDto = z.infer<typeof InstituteFiltersSchema>;

export const InstituteGetFilterSchema = z.object({
  filters: InstituteFiltersSchema,
  order: GlobalSchema.fields.order,
  page: GlobalSchema.fields.page,
});

export type InstituteGetFilterDto = z.infer<typeof InstituteGetFilterSchema>;
