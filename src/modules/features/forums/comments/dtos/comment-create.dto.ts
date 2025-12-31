import { z } from "zod";
import { CommentModel } from "../comment.model";

export const CommentCreateSchema = CommentModel.dbSchema.pick({
  localId: true,
  forumId: true,
  body: true,
  replyingTo: true,
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;
