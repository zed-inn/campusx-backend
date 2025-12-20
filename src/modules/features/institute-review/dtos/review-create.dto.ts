import { z } from "zod";
import { ReviewInterface } from "../review.interface";

export const ReviewCreateSchema = z.object({
  instituteId: ReviewInterface.fields.instituteId,
  body: ReviewInterface.fields.body,
  rating: ReviewInterface.fields.rating,
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;
