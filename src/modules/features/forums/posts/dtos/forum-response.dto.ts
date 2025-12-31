import { ProfileResponseShort } from "@modules/core/user-profile";
import { z } from "zod";
import { ForumModel } from "../posts.model";

export const ForumResponseSchema = ForumModel.dbSchema
  .pick({
    id: true,
    body: true,
    commentsCount: true,
    createDate: true,
    updateDate: true,
    likesCount: true,
    imageUrl: true,
    localId: true,
    title: true,
  })
  .extend({
    writer: ProfileResponseShort,
    isLiked: z.boolean("Invalid IsLiked").default(false),
  });

export type ForumResponseDto = z.infer<typeof ForumResponseSchema>;
