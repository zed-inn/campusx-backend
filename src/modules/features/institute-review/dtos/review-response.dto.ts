import { z } from "zod";
import { ReviewModel } from "../review.model";
import { ShortUserSchema } from "@modules/core/profile";

export const ReviewSchema = ReviewModel.dbSchema.extend({
  writer: ShortUserSchema,
});

export type ReviewDto = z.infer<typeof ReviewSchema>;
