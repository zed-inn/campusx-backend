import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { ReportModel } from "@modules/features/forums/report/report.model";

export const ReportFiltersSchema = ReportModel.dbSchema.partial();

export type ReportFiltersDto = z.infer<typeof ReportFiltersSchema>;

export const ReportGetFilterSchema = ReportFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type ReportGetFilterDto = z.infer<typeof ReportGetFilterSchema>;
