import { z } from "zod";
import { CommentModel } from "../comment.model";
import { CommentCreateSchema } from "./comment-create.dto";

export const CommentUpdateSchema = CommentModel.dbSchema
  .pick({ id: true })
  .extend(
    CommentCreateSchema.pick({ localId: true, body: true }).partial().shape
  );

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;
