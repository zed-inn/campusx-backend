import { z } from "zod";
import { ReviewInterface } from "../../review.interface";
import { ProfileSchema } from "@modules/core/profile";
import { InstituteSchema } from "@modules/core/institutes";

export const ReviewSchema = ReviewInterface.dbSchema.extend({
  writer: ProfileSchema,
  institute: InstituteSchema,
});

export type ReviewDto = z.infer<typeof ReviewSchema>;
