import { ReportModel } from "@modules/core/user/report/report.model";
import { UserModel } from "@modules/core/user/user.model";
import { z } from "zod";

export const ReportSchema = ReportModel.dbSchema.extend({
  user: UserModel.dbSchema,
});

export type ReportDto = z.infer<typeof ReportSchema>;
