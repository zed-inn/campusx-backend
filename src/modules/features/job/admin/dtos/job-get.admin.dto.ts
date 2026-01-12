import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { JobModel } from "../../job.model";

export const JobFiltersSchema = JobModel.dbSchema.partial();

export type JobFiltersDto = z.infer<typeof JobFiltersSchema>;

export const JobGetFilterSchema = JobFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type JobGetFilterDto = z.infer<typeof JobGetFilterSchema>;
