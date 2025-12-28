import { z } from "zod";
import { FeedbackSchema } from "../service/feedback-schema.dto";
import { ProfileResMin } from "@modules/core/profile";

export const FeedbackResponseSchema = FeedbackSchema.pick({
  id: true,
  message: true,
  status: true,
  createDate: true,
  updateDate: true,
}).extend({
  writer: ProfileResMin,
});

export type FeedbackResponseDto = z.infer<typeof FeedbackResponseSchema>;
