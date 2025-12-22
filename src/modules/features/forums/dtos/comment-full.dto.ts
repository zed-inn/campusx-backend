import { z } from "zod";
import { ProfileInterface } from "@modules/core/profile";
import { CommentInterface } from "../interfaces/comment.interface";
import { ForumInterface } from "../interfaces/forum.interface";

export const CommentFullSchema = CommentInterface.dbSchema.extend({
  writer: ProfileInterface.dbSchema.extend({
    ...ProfileInterface.extra.fields,
  }),
  forum: z.object({
    ...ForumInterface.fields,
    writer: ProfileInterface.dbSchema.extend({
      ...ProfileInterface.extra.fields,
    }),
  }),
  parentComment: CommentInterface.dbSchema
    .extend({
      writer: ProfileInterface.dbSchema.extend({
        ...ProfileInterface.extra.fields,
      }),
      forum: z.object({
        ...ForumInterface.fields,
        writer: ProfileInterface.dbSchema.extend({
          ...ProfileInterface.extra.fields,
        }),
      }),
    })
    .nullable()
    .default(null),
});

export type CommentFullAttributes = z.infer<typeof CommentFullSchema>;
