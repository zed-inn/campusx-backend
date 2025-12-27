import { z } from "zod";
import { CategorySchema } from "../service/category-schema.dto";
import { InsightSchema } from "../service/insight-schema.dto";

export const InsightResponseSchema = InsightSchema.pick({
  body: true,
  createDate: true,
  hindiBody: true,
  hindiTitle: true,
  id: true,
  imageUrl: true,
  title: true,
  updateDate: true,
}).extend({
  category: CategorySchema.pick({ name: true }),
});

export type InsightResponseDto = z.infer<typeof InsightResponseSchema>;
