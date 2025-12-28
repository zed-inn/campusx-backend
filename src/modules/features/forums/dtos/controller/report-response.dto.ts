import { z } from "zod";
import { ReportSchema } from "../service/report-schema.dto";
import { ProfileResMin } from "@modules/core/profile";

export const ReportResponseSchema = ReportSchema.pick({
  id: true,
  createDate: true,
  updateDate: true,
  forumId: true,
  reason: true,
}).extend({
  user: ProfileResMin,
});

export type ReportResponseDto = z.infer<typeof ReportResponseSchema>;
