import { z } from "zod";
import { ReviewInterface } from "../../review.interface";
import { ProfileSchema } from "@modules/core/profile/dtos/service/profile-schema.dto";
import { InstituteSchema } from "@modules/core/institutes/dtos/service/institute-schema.dto";

export const ReviewSchema = ReviewInterface.dbSchema.extend({
  writer: ProfileSchema,
  institute: InstituteSchema,
});

export type ReviewDto = z.infer<typeof ReviewSchema>;
