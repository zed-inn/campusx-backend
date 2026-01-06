import { UserModel } from "@modules/core/user";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";
import { PostModel } from "../post.model";

export const PostGetOneSchema = z.object({
  id: PostModel.fields.id,
});

export type PostGetOneDto = z.infer<typeof PostGetOneSchema>;

export const PostGetUsersSchema = z.object({
  userId: UserModel.fields.id,
  page: GlobalSchema.fields.page,
});

export type PostGetUsersDto = z.infer<typeof PostGetUsersSchema>;

export const PostGetLatestSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type PostGetLatestDto = z.infer<typeof PostGetLatestSchema>;

export const PostGetMineSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type PostGetMineDto = z.infer<typeof PostGetMineSchema>;
