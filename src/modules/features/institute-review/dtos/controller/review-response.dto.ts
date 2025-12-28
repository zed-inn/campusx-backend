import { z } from "zod";
import { ReviewSchema } from "../service/review-schema.dto";
import { InstituteSchema } from "@modules/core/institutes";
import { ProfileResMin } from "@modules/core/profile";

export const ReviewResponseSchema = ReviewSchema.pick({
  createDate: true,
  updateDate: true,
  id: true,
  body: true,
  rating: true,
}).extend({
  writer: ProfileResMin,
  institute: InstituteSchema.pick({ id: true, name: true }),
});

export type ReviewResponseDto = z.infer<typeof ReviewResponseSchema>;
