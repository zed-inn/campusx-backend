import { z } from "zod";
import { ReviewSchema } from "./review-schema.dto";

export const ReviewUpdateSchema = ReviewSchema.pick({
  id: true,
}).extend({
  ...ReviewSchema.pick({ body: true, rating: true }).partial().shape,
});

export type ReviewUpdateDto = z.infer<typeof ReviewUpdateSchema>;
