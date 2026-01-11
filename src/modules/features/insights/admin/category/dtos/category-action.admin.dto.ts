import { CategoryModel } from "@modules/features/insights/category/category.model";
import { z } from "zod";

export const CategoryCreateSchema = CategoryModel.dbFields.omit({
  id: true,
});

export type CategoryCreateDto = z.infer<typeof CategoryCreateSchema>;

export const CategoryUpdateSchema = CategoryModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: CategoryModel.fields.id });

export type CategoryUpdateDto = z.infer<typeof CategoryUpdateSchema>;

export const CategoryDeleteSchema = CategoryModel.dbSchema.pick({ id: true });

export type CategoryDeleteDto = z.infer<typeof CategoryDeleteSchema>;
