import { z } from "zod";
import { BaseSchema } from "@shared/dtos/base.dto";
import { CommentInterface } from "../interfaces/comment.interface";

export const CommentResponseSchema = BaseSchema.extend({
  id: CommentInterface.fields.id,
  forumId: CommentInterface.fields.forumId,
  localId: CommentInterface.fields.localId,
  replyingTo: CommentInterface.fields.replyingTo,
  body: CommentInterface.fields.body,
  repliesCount: CommentInterface.fields.repliesCount,
  writer: CommentInterface.extra.fields.writer,
  parentComment: z
    .object({
      id: CommentInterface.fields.id,
      body: CommentInterface.fields.body,
      writer: CommentInterface.extra.fields.writer,
    })
    .nullable()
    .default(null),
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
