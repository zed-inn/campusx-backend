import { z } from "zod";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { ReportSchema } from "../service/report-schema.dto";

export const ReportResponseSchema = ReportSchema.pick({
  id: true,
  createDate: true,
  updateDate: true,
  forumId: true,
  reason: true,
}).extend({
  user: ProfileResponseMinSchema,
});

export type ReportResponseDto = z.infer<typeof ReportResponseSchema>;
