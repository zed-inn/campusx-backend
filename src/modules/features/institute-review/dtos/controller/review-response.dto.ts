import { z } from "zod";
import { ReviewSchema } from "../service/review-schema.dto";
import { InstituteSchema } from "@modules/core/institutes";

export const ReviewResponseSchema = ReviewSchema.pick({
  createDate: true,
  updateDate: true,
  id: true,
  body: true,
  rating: true,
  writer: true,
}).extend({
  institute: InstituteSchema.pick({ id: true, name: true }),
});

export type ReviewResponseDto = z.infer<typeof ReviewResponseSchema>;
