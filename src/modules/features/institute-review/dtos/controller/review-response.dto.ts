import { z } from "zod";
import { ReviewSchema } from "../service/review-full.dto";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { InstituteSchema } from "@modules/core/institutes/dtos/service/institute-schema.dto";

export const ReviewResponseSchema = ReviewSchema.pick({
  createDate: true,
  updateDate: true,
  id: true,
  body: true,
  rating: true,
}).extend({
  writer: ProfileResponseMinSchema,
  institute: InstituteSchema.pick({ id: true, name: true }),
});

export type ReviewResponseDto = z.infer<typeof ReviewResponseSchema>;
