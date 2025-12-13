import { z } from "zod";

export const CommentCreateSchema = z.object({
  forumId: z.uuidv4("Invalid Forum Id"),
  localId: z.string("Invalid localId").nullable(),
  body: z.string("Invalid comment"),
  replyingTo: z.uuidv4("Invalid commentId for replying").nullable(),
});

export type CommentCreateDto = z.infer<typeof CommentCreateSchema>;
