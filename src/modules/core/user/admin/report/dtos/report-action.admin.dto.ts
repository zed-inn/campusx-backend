import { ReportModel } from "@modules/core/user/report/report.model";
import { z } from "zod";

export const ReportUpdateSchema = ReportModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: ReportModel.fields.id });

export type ReportUpdateDto = z.infer<typeof ReportUpdateSchema>;

export const ReportDeleteSchema = ReportModel.dbSchema.pick({ id: true });

export type ReportDeleteDto = z.infer<typeof ReportDeleteSchema>;
