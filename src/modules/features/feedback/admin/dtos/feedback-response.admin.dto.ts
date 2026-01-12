import { z } from "zod";
import { FeedbackModel } from "../../feedback.model";
import { ProfileModel } from "@modules/core/profile";

export const FeedbackSchema = FeedbackModel.dbSchema.extend({
  user: ProfileModel.dbSchema.nullable(),
});

export type FeedbackDto = z.infer<typeof FeedbackSchema>;
