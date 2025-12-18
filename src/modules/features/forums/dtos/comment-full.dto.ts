import { z } from "zod";
import { ProfileInterface } from "@modules/core/profile";
import { CommentInterface } from "../interfaces/comment.interface";
import { ForumInterface } from "../interfaces/forum.interface";

export const CommentFullSchema = CommentInterface.dbSchema.extend({
  writer: ProfileInterface.dbSchema,
  forum: z.object({
    ...ForumInterface.fields,
    writer: ForumInterface.extra.fields.writer,
  }),
});

export type CommentFullAttributes = z.infer<typeof CommentFullSchema>;
