import { z } from "zod";
import { CommentCreateSchema } from "./comment-create.dto";
import { CommentSchema } from "./comment-schema.dto";

export const CommentUpdateSchema = CommentSchema.pick({ id: true }).extend({
  ...CommentCreateSchema.pick({
    localId: true,
    body: true,
  }).shape,
});

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;
