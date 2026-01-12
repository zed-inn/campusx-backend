import { PostModel } from "@modules/features/forums/post/post.model";
import { CategoryModel } from "@modules/features/insights/category/category.model";
import { z } from "zod";

export const PostSchema = PostModel.dbSchema.extend({
  category: CategoryModel.fields.name.nullable().default(null),
});

export type PostDto = z.infer<typeof PostSchema>;
