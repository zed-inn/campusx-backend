import { z } from "zod";
import { ForumSchema } from "../service/forum-schema.dto";
import { ProfileResMin } from "@modules/core/profile";

export const ForumResponseSchema = ForumSchema.pick({
  id: true,
  body: true,
  commentsCount: true,
  createDate: true,
  updateDate: true,
  likesCount: true,
  imageUrl: true,
  localId: true,
  title: true,
  isLiked: true,
}).extend({
  writer: ProfileResMin,
});

export type ForumResponseDto = z.infer<typeof ForumResponseSchema>;
