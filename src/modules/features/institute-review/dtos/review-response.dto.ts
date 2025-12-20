import { z } from "zod";
import { ReviewInterface } from "../review.interface";
import { BaseSchema } from "@shared/dtos/base.dto";

export const ReviewResponseSchema = BaseSchema.extend({
  body: ReviewInterface.fields.body,
  rating: ReviewInterface.fields.rating,
  writer: ReviewInterface.extra.fields.writer,
  institute: ReviewInterface.extra.fields.institute,
});

export type ReviewResponseDto = z.infer<typeof ReviewResponseSchema>;
