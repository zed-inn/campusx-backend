import { ReviewModel } from "../review.model";
import { z } from "zod";

export const ReviewCreateSchema = z.object({
  localId: ReviewModel.fields.localId.default(null),
  instituteId: ReviewModel.fields.instituteId,
  body: ReviewModel.fields.body,
  rating: ReviewModel.fields.rating,
});

export type ReviewCreateDto = z.infer<typeof ReviewCreateSchema>;

export const ReviewUpdateSchema = ReviewModel.dbSchema
  .pick({ body: true, rating: true })
  .partial()
  .extend({ id: ReviewModel.fields.id });

export type ReviewUpdateDto = z.infer<typeof ReviewUpdateSchema>;

export const ReviewDeleteSchema = z.object({
  reviewId: ReviewModel.fields.id,
});

export type ReviewDeleteDto = z.infer<typeof ReviewDeleteSchema>;
