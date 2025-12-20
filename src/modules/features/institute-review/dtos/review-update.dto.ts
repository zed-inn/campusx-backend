import { z } from "zod";
import { ReviewInterface } from "../review.interface";

export const ReviewUpdateSchema = z.object({
  id: ReviewInterface.fields.id,
  body: ReviewInterface.fields.body.optional(),
  rating: ReviewInterface.fields.rating.optional(),
});

export type ReviewUpdateDto = z.infer<typeof ReviewUpdateSchema>;
