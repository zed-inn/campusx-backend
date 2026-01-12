import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { PostModel } from "@modules/features/forums/post/post.model";

export const PostFiltersSchema = PostModel.dbSchema.partial();

export type PostFiltersDto = z.infer<typeof PostFiltersSchema>;

export const PostGetFilterSchema = PostFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type PostGetFilterDto = z.infer<typeof PostGetFilterSchema>;
