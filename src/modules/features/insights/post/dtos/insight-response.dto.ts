import { z } from "zod";
import { InsightModel } from "../insight.model";
import { CategoryModel } from "../../category/category.model";

export const InsightResponseSchema = InsightModel.dbSchema
  .pick({
    body: true,
    createDate: true,
    hindiBody: true,
    hindiTitle: true,
    id: true,
    imageUrl: true,
    title: true,
    updateDate: true,
  })
  .extend({
    category: CategoryModel.dbSchema.pick({ name: true }),
  });

export type InsightResponseDto = z.infer<typeof InsightResponseSchema>;
