import { PostModel } from "@modules/features/insights/post/post.model";
import { z } from "zod";

export const PostCreateSchema = PostModel.dbFields.omit({ id: true });

export type PostCreateDto = z.infer<typeof PostCreateSchema>;

export const PostUpdateSchema = PostModel.dbFields
  .omit({ id: true })
  .partial()
  .extend({ id: PostModel.fields.id });

export type PostUpdateDto = z.infer<typeof PostUpdateSchema>;

export const PostDeleteSchema = PostModel.dbSchema.pick({ id: true });

export type PostDeleteDto = z.infer<typeof PostDeleteSchema>;
