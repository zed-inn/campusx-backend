import { z } from "zod";
import { ProfileResponseShort } from "@modules/core/user-profile";
import { DiscussionModel } from "../discussion.model";

export const DiscussionResponseSchema = DiscussionModel.dbSchema
  .pick({
    createDate: true,
    id: true,
    message: true,
    replyingTo: true,
    updateDate: true,
    instituteId: true,
  })
  .extend({
    isLiked: z.boolean("Invalid IsLiked").default(false),
    writer: ProfileResponseShort,
    parentMessage: DiscussionModel.dbSchema
      .pick({
        id: true,
        message: true,
      })
      .extend({
        writer: ProfileResponseShort,
      }),
  });

export type DiscussionResponseDto = z.infer<typeof DiscussionResponseSchema>;
