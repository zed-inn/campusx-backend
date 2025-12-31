import { z } from "zod";
import { ReviewModel } from "../review.model";
import { ProfileResponseShort } from "@modules/core/user-profile";

export const ReviewResponseSchema = ReviewModel.dbSchema
  .pick({
    createDate: true,
    updateDate: true,
    id: true,
    body: true,
    rating: true,
  })
  .extend({
    writer: ProfileResponseShort,
  });

export type ReviewResponseDto = z.infer<typeof ReviewResponseSchema>;
