import { z } from "zod";
import { CommentModel } from "../comment.model";
import { PostModel } from "../../post/post.model";

export const CommentCreateSchema = z.object({
  localId: CommentModel.fields.localId.default(null),
  body: CommentModel.fields.body,
  replyingTo: CommentModel.fields.replyingTo.default(null),
  forumId: PostModel.fields.id,
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;

export const CommentUpdateSchema = CommentModel.dbSchema
  .pick({ localId: true, body: true })
  .partial()
  .extend({ commentId: CommentModel.fields.id });

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;

export const CommentDeleteSchema = z.object({
  commentId: CommentModel.fields.id,
});

export type CommentDeleteDto = z.infer<typeof CommentDeleteSchema>;
