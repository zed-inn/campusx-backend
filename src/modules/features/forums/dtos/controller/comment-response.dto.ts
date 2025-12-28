import { z } from "zod";
import { CommentSchema } from "../service/comment-schema.dto";
import { ProfileResMin } from "@modules/core/profile";

export const CommentResponseSchema = CommentSchema.pick({
  createDate: true,
  updateDate: true,
  id: true,
  body: true,
  forumId: true,
  localId: true,
  repliesCount: true,
  replyingTo: true,
}).extend({
  writer: ProfileResMin,
  parentComment: CommentSchema.pick({
    id: true,
    body: true,
  }).extend({ writer: ProfileResMin }),
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
