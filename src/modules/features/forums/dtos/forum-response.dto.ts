import { z } from "zod";
import { BaseSchema } from "@shared/dtos/base.dto";
import { ForumInterface } from "../interfaces/forum.interface";

export const ForumResponseSchema = BaseSchema.extend({
  id: ForumInterface.fields.id,
  localId: ForumInterface.fields.localId,
  title: ForumInterface.fields.title,
  body: ForumInterface.fields.body,
  imageUrl: ForumInterface.fields.imageUrl,
  comments: ForumInterface.fields.commentsCount,
  likes: ForumInterface.fields.likesCount,
  writer: ForumInterface.extra.fields.writer,
  isLiked: ForumInterface.extra.fields.isLiked,
});

export type ForumResponseDto = z.infer<typeof ForumResponseSchema>;
