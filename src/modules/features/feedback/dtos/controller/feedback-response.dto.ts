import { z } from "zod";
import { FeedbackInterface } from "../../feedback.interface";

export const FeedbackResponseSchema = FeedbackInterface.dbSchema
  .pick({
    id: true,
    message: true,
    status: true,
    createDate: true,
    updateDate: true,
  })
  .extend({
    writer: FeedbackInterface.extra.fields.writer,
  });

export type FeedbackResponseDto = z.infer<typeof FeedbackResponseSchema>;
