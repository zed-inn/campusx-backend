import { z } from "zod";
import { FeedbackModel } from "../feedback.model";

export const FeedbackCreateSchema = z.object({
  message: FeedbackModel.fields.message,
  platformUsed: FeedbackModel.fields.platformUsed,
});

export type FeedbackCreateDto = z.infer<typeof FeedbackCreateSchema>;
