import { z } from "zod";
import { ReviewModel } from "../review.model";

export const ReviewUpdateSchema = ReviewModel.dbSchema
  .pick({
    id: true,
  })
  .extend(
    ReviewModel.dbSchema.pick({ body: true, rating: true }).partial().shape
  );

export type ReviewUpdateDto = z.infer<typeof ReviewUpdateSchema>;
