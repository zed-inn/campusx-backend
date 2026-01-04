import { z } from "zod";
import { ReportModel } from "../report.model";

export const ReportCreateSchema = z.object({
  userId: ReportModel.fields.userId,
  reason: ReportModel.fields.reason.default(null),
});

export type ReportCreateDto = z.infer<typeof ReportCreateSchema>;
