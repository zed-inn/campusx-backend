import { z } from "zod";
import { ReportInterface } from "../../interfaces/report.interface";
import { ProfileSchema } from "@modules/core/profile";

export const ReportSchema = ReportInterface.dbSchema.extend({
  user: ProfileSchema,
});

export type ReportDto = z.infer<typeof ReportSchema>;
