import { z } from "zod";
import { CommentSchema } from "../service/comment-schema.dto";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";

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
  writer: ProfileResponseMinSchema,
  parentComment: CommentSchema.pick({
    id: true,
    body: true,
  }).extend({
    writer: ProfileResponseMinSchema,
  }),
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
