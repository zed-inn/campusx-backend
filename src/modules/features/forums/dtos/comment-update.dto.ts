import { z } from "zod";
import { CommentInterface } from "../interfaces/comment.interface";

export const CommentUpdateSchema = z.object({
  id: CommentInterface.fields.id,
  localId: CommentInterface.fields.localId.optional(),
  body: CommentInterface.fields.body.optional(),
});

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;
