import { z } from "zod";
import { FeedbackModel } from "../../feedback.model";

export const FeedbackUpdateSchema = FeedbackModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: FeedbackModel.fields.id });

export type FeedbackUpdateDto = z.infer<typeof FeedbackUpdateSchema>;

export const FeedbackDeleteSchema = FeedbackModel.dbSchema.pick({ id: true });

export type FeedbackDeleteDto = z.infer<typeof FeedbackDeleteSchema>;
