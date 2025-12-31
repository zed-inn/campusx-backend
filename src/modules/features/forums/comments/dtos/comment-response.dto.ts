import { ProfileResponseShort } from "@modules/core/user-profile";
import { z } from "zod";
import { CommentModel } from "../comment.model";

export const CommentResponseSchema = CommentModel.dbSchema
  .pick({
    createDate: true,
    updateDate: true,
    id: true,
    body: true,
    forumId: true,
    localId: true,
    repliesCount: true,
    replyingTo: true,
  })
  .extend({
    writer: ProfileResponseShort,
    parentComment: CommentModel.dbSchema
      .pick({
        id: true,
        body: true,
      })
      .extend({ writer: ProfileResponseShort }),
  });

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
