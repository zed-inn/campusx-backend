import { z } from "zod";
import { ReportInterface } from "../interfaces/report.interface";
import { BaseSchema } from "@shared/dtos/base.dto";

export const ReportResponseSchema = BaseSchema.extend({
  id: ReportInterface.fields.id,
  forumId: ReportInterface.fields.forumId,
  reason: ReportInterface.fields.reason,
  user: ReportInterface.extra.fields.user,
});

export type ReportResponseAttributes = z.infer<typeof ReportResponseSchema>;
