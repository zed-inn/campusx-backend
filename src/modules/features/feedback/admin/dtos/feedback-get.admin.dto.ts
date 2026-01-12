import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { FeedbackModel } from "../../feedback.model";

export const FeedbackFiltersSchema = FeedbackModel.dbSchema.partial();

export type FeedbackFiltersDto = z.infer<typeof FeedbackFiltersSchema>;

export const FeedbackGetFilterSchema = FeedbackFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type FeedbackGetFilterDto = z.infer<typeof FeedbackGetFilterSchema>;
