import { z } from "zod";
import { CategoryInterface } from "../../interfaces/category.interface";

export const CategorySchema = CategoryInterface.dbSchema;

export type CategoryDto = z.infer<typeof CategorySchema>;
