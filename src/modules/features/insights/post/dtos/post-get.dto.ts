import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";
import { PostModel } from "../post.model";

export const PostGetSchema = z.object({
  categories: z.string("Invalid Categories").optional(),
  page: GlobalSchema.fields.page,
});

export type PostGetDto = z.infer<typeof PostGetSchema>;

export const PostGetOneSchema = PostModel.dbSchema.pick({ id: true });

export type PostGetOneDto = z.infer<typeof PostGetOneSchema>;
