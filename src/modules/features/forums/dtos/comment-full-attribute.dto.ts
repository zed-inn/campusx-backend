import { z } from "zod";
import { CommentDbSchema } from "../interfaces/comment.interface";
import { ProfileDbSchema } from "@modules/core/profile";
import { ForumDbSchema } from "../interfaces/forum.interface";

export const CommentFullAttributesSchema = CommentDbSchema.extend({
  writer: ProfileDbSchema,
  forum: ForumDbSchema,
});

export type CommentFullAttributesDto = z.infer<
  typeof CommentFullAttributesSchema
>;
