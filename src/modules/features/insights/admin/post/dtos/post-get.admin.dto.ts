import { PostModel } from "@modules/features/insights/post/post.model";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const PostFiltersSchema = PostModel.dbSchema.partial();

export type PostFiltersDto = z.infer<typeof PostFiltersSchema>;

export const PostGetFilterSchema = PostFiltersSchema.extend({
  page: GlobalSchema.fields.page,
  order: GlobalSchema.fields.order,
});

export type PostGetFilterDto = z.infer<typeof PostGetFilterSchema>;
