import { z } from "zod";
import { ProfileInterface } from "@modules/core/profile";
import { ReportInterface } from "../interfaces/report.interface";

export const ReportFullSchema = ReportInterface.dbSchema.extend({
  user: ProfileInterface.dbSchema,
});

export type ReportFullAttributes = z.infer<typeof ReportFullSchema>;
