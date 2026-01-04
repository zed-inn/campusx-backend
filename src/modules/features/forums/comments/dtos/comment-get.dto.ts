import { z } from "zod";
import { PostModel } from "../../post/post.model";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { CommentModel } from "../comment.model";

export const CommentGetPostSchema = z.object({
  forumId: PostModel.fields.id,
  page: GlobalSchema.fields.page,
  parentCommentId: CommentModel.fields.replyingTo.default(null),
});

export type CommentGetPostDto = z.infer<typeof CommentGetPostSchema>;
