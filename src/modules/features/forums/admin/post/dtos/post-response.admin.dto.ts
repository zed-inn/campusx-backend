import { UserModel } from "@modules/core/user";
import { PostModel } from "@modules/features/forums/post/post.model";
import { z } from "zod";

export const PostSchema = PostModel.dbSchema.extend({
  user: UserModel.dbSchema,
  stats: z.object({
    likes: z.number().nonnegative().default(0),
    comments: z.number().nonnegative().default(0),
  }),
});

export type PostDto = z.infer<typeof PostSchema>;
