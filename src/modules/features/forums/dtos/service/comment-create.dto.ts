import { z } from "zod";
import { CommentInterface } from "../../interfaces/comment.interface";

export const CommentCreateSchema = CommentInterface.dbSchema.pick({
  localId: true,
  forumId: true,
  body: true,
  replyingTo: true,
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;
