import { z } from "zod";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";
import { ForumSchema } from "../service/forum-schema.dto";

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
  writer: ProfileResponseMinSchema,
});

export type ForumResponseDto = z.infer<typeof ForumResponseSchema>;
