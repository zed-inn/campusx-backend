import { z } from "zod";
import { FeedbackSchema } from "../service/feedback-schema.dto";

export const FeedbackResponseSchema = FeedbackSchema.pick({
  id: true,
  message: true,
  status: true,
  createDate: true,
  updateDate: true,
  writer: true,
});

export type FeedbackResponseDto = z.infer<typeof FeedbackResponseSchema>;
