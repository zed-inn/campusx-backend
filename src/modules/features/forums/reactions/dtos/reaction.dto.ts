import { z } from "zod";
import { PostModel } from "../../post/post.model";

export const ReactActionSchema = z.object({
  forumId: PostModel.fields.id,
});

export type ReactActionDto = z.infer<typeof ReactActionSchema>;
