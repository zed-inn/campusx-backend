import { PostModel } from "@modules/features/forums/post/post.model";
import { z } from "zod";

export const PostSchema = PostModel.dbSchema;

export type PostDto = z.infer<typeof PostSchema>;
