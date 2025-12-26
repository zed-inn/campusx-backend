import { z } from "zod";
import { CommentCreateSchema } from "./comment-create.dto";
import { CommentInterface } from "../../interfaces/comment.interface";

export const CommentUpdateSchema = CommentInterface.dbSchema
  .pick({ id: true })
  .extend({
    ...CommentCreateSchema.pick({
      localId: true,
      body: true,
    }).shape,
  });

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;
