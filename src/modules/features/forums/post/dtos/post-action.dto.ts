import { z } from "zod";
import { PostModel } from "../post.model";

export const PostCreateSchema = z.object({
  localId: PostModel.fields.localId.default(null),
  title: PostModel.fields.title,
  body: PostModel.fields.body.default(null),
  imageUrl: PostModel.fields.imageUrl.default(null),
});

export type PostCreateDto = z.infer<typeof PostCreateSchema>;

export const PostUpdateSchema = PostModel.dbSchema
  .pick({
    localId: true,
    title: true,
    body: true,
    imageUrl: true,
  })
  .partial()
  .extend({
    forumId: PostModel.fields.id,
  });

export type PostUpdateDto = z.infer<typeof PostUpdateSchema>;

export const PostDeleteSchema = z.object({
  forumId: PostModel.fields.id,
});

export type PostDeleteDto = z.infer<typeof PostDeleteSchema>;
