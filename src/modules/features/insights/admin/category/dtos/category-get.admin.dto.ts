import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { CategoryModel } from "@modules/features/insights/category/category.model";

export const CategoryFiltersSchema = CategoryModel.dbSchema.partial();

export type CategoryFiltersDto = z.infer<typeof CategoryFiltersSchema>;

export const CategoryGetFilterSchema = CategoryFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type CategoryGetFilterDto = z.infer<typeof CategoryGetFilterSchema>;
