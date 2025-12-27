import { z } from "zod";
import { ReviewSchema } from "./review-schema.dto";

export const ReviewCreateSchema = ReviewSchema.pick({
  instituteId: true,
  body: true,
  rating: true,
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;
