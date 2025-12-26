import { z } from "zod";
import { ReviewSchema } from "./review-full.dto";

export const ReviewCreateSchema = ReviewSchema.pick({
  instituteId: true,
  body: true,
  rating: true,
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;
