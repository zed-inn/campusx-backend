import { z } from "zod";
import { ForumInterface } from "../../interfaces/forum.interface";
import { ForumCreateSchema } from "./forum-create.dto";

export const ForumUpdateSchema = z.object({
  id: ForumInterface.fields.id,
  ...ForumCreateSchema.partial().shape,
});

export type ForumUpdateDto = z.infer<typeof ForumUpdateSchema>;
