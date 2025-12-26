import { z } from "zod";
import { InsightInterface } from "../../interfaces/insight.interface";
import { CategorySchema } from "../service/category-schema.dto";

export const InsightResponseSchema = InsightInterface.dbSchema
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
    category: CategorySchema.pick({ name: true }),
  });

export type InsightResponseDto = z.infer<typeof InsightResponseSchema>;
