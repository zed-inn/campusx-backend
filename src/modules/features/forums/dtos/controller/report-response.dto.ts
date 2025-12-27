import { z } from "zod";
import { ReportSchema } from "../service/report-schema.dto";

export const ReportResponseSchema = ReportSchema.pick({
  id: true,
  createDate: true,
  updateDate: true,
  forumId: true,
  reason: true,
  user: true,
});

export type ReportResponseDto = z.infer<typeof ReportResponseSchema>;
