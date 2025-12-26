import { z } from "zod";
import { InsightInterface } from "../../interfaces/insight.interface";
import { CategorySchema } from "./category-schema.dto";

export const InsightSchema = InsightInterface.dbSchema.extend({
  category: CategorySchema,
});

export type InsightDto = z.infer<typeof InsightSchema>;
