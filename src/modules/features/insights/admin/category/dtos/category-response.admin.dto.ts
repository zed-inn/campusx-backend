import { CategoryModel } from "@modules/features/insights/category/category.model";
import { z } from "zod";

export const CategorySchema = CategoryModel.dbSchema;

export type CategoryDto = z.infer<typeof CategorySchema>;
