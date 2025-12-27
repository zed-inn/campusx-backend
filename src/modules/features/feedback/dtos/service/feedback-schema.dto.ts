import { z } from "zod";
import { FeedbackInterface } from "../../feedback.interface";
import { ProfileSchema } from "@modules/core/profile";

export const FeedbackSchema = FeedbackInterface.dbSchema.extend({
  writer: ProfileSchema,
});

export type FeedbackDto = z.infer<typeof FeedbackSchema>;
