import { z } from "zod";
import { CommentInterface } from "../../interfaces/comment.interface";
import { ProfileSchema } from "@modules/core/profile";

export const CommentSchema = CommentInterface.dbSchema.extend({
  writer: ProfileSchema,
  parentComment: CommentInterface.dbSchema
    .extend({ writer: ProfileSchema })
    .nullable()
    .default(null),
});

export type CommentDto = z.infer<typeof CommentSchema>;
