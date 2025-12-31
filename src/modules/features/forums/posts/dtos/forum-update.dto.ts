import { z } from "zod";
import { ForumModel } from "../posts.model";
import { ForumCreateSchema } from "./forum-create.dto";

export const ForumUpdateSchema = ForumModel.dbSchema
  .pick({ id: true })
  .extend(ForumCreateSchema.partial().shape);

export type ForumUpdateDto = z.infer<typeof ForumUpdateSchema>;
