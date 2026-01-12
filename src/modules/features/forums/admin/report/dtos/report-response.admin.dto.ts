import { ProfileModel } from "@modules/core/profile";
import { ReportModel } from "@modules/features/forums/report/report.model";
import { z } from "zod";

export const ReportSchema = ReportModel.dbSchema.extend({
  user: ProfileModel.dbSchema,
});

export type ReportDto = z.infer<typeof ReportSchema>;
