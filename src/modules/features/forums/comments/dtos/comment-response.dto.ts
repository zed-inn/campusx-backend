import { z } from "zod";
import { CommentModel } from "../comment.model";
import { ShortUserSchema } from "@modules/core/profile";

export const CommentSchema = CommentModel.dbSchema.extend({
  writer: ShortUserSchema,
  parentComment: CommentModel.dbSchema
    .pick({ id: true, body: true })
    .extend({ writer: ShortUserSchema })
    .nullable(),
});

export type CommentDto = z.infer<typeof CommentSchema>;
