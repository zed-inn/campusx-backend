import { z } from "zod";
import { CommentSchema } from "../service/comment-schema.dto";

export const CommentResponseSchema = CommentSchema.pick({
  createDate: true,
  updateDate: true,
  id: true,
  body: true,
  forumId: true,
  localId: true,
  repliesCount: true,
  replyingTo: true,
  writer: true,
}).extend({
  parentComment: CommentSchema.pick({
    id: true,
    body: true,
    writer: true,
  }),
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
