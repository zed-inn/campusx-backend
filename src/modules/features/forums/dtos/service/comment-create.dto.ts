import { z } from "zod";
import { CommentSchema } from "./comment-schema.dto";

export const CommentCreateSchema = CommentSchema.pick({
  localId: true,
  forumId: true,
  body: true,
  replyingTo: true,
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;
