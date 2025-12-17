import { z } from "zod";
import { CommentInterface } from "../interfaces/comment.interface";

export const CommentCreateSchema = z.object({
  forumId: CommentInterface.fields.forumId,
  localId: CommentInterface.fields.localId.default(null),
  body: CommentInterface.fields.body,
  replyingTo: CommentInterface.fields.replyingTo.default(null),
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;
