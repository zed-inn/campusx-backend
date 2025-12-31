import { z } from "zod";
import { ReviewModel } from "../review.model";

export const ReviewCreateSchema = ReviewModel.dbSchema.pick({
  instituteId: true,
  body: true,
  rating: true,
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;
