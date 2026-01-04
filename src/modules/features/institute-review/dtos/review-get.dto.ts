import { z } from "zod";
import { ReviewModel } from "../review.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const ReviewGetMineSchema = z.object({
  instituteId: ReviewModel.fields.instituteId,
});

export type ReviewGetMineDto = z.infer<typeof ReviewGetMineSchema>;

export const ReviewGetPageSchema = z.object({
  instituteId: ReviewModel.fields.instituteId,
  page: GlobalSchema.fields.page,
});

export type ReviewGetPageDto = z.infer<typeof ReviewGetPageSchema>;
