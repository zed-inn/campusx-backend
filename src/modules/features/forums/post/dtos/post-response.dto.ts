import { z } from "zod";
import { PostModel } from "../post.model";
import { ShortUserSchema } from "@modules/core/profile";

export const PostSchema = PostModel.dbSchema.extend({
  writer: ShortUserSchema,
  isLiked: z.boolean("Invalid IsLiked").default(false),
  stats: z.object({
    likes: z.number().nonnegative().default(0),
    comments: z.number().nonnegative().default(0),
  }),
});

export type PostDto = z.infer<typeof PostSchema>;
