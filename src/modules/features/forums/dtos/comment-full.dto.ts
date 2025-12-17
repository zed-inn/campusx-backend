import { z } from "zod";
import { ProfileInterface } from "@modules/core/profile";
import { CommentInterface } from "../interfaces/comment.interface";
import { ForumInterface } from "../interfaces/forum.interface";

export const CommentFullSchema = CommentInterface.dbSchema.extend({
  writer: ProfileInterface.dbSchema,
  forum: ForumInterface.dbSchema,
});

export type CommentFullAttributes = z.infer<typeof CommentFullSchema>;
