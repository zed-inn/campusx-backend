import { z } from "zod";
import { CategoryModel } from "../../category/category.model";
import { PostModel } from "../post.model";

export const PostSchema = PostModel.dbSchema.extend({
  category: CategoryModel.fields.name.nullable().default(null),
});

export type PostDto = z.infer<typeof PostSchema>;
