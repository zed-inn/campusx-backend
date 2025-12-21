import { z } from "zod";
import { FeedbackInterface } from "../feedback.interface";
import { ProfileInterface } from "@modules/core/profile";

export const FeedbackFullSchema = z.object({
  ...FeedbackInterface.fields,
  writer: ProfileInterface.dbSchema.nullable().default(null),
});

export type FeedbackFullDto = z.infer<typeof FeedbackFullSchema>;
