import { z } from "zod";
import { ReviewInterface } from "../review.interface";
import { ProfileInterface } from "@modules/core/profile";
import { InstituteInterface } from "@modules/core/institutes";

export const ReviewFullSchema = ReviewInterface.dbSchema.extend({
  writer: ProfileInterface.dbSchema,
  institute: InstituteInterface.dbSchema,
});

export type ReviewFullDto = z.infer<typeof ReviewFullSchema>;
