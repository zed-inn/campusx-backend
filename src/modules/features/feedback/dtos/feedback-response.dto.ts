import { z } from "zod";
import { FeedbackInterface } from "../feedback.interface";
import { BaseSchema } from "@shared/dtos/base.dto";

export const FeedbackResponseSchema = z.object({
  ...BaseSchema.extend({
    id: FeedbackInterface.fields.id,
    status: FeedbackInterface.fields.status,
    message: FeedbackInterface.fields.message,
  }).shape,
  writer: FeedbackInterface.extra.fields.writer.default(null),
});

export type FeedbackResponseDto = z.infer<typeof FeedbackResponseSchema>;
