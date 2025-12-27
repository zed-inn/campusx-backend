import { z } from "zod";
import { ForumCreateSchema } from "./forum-create.dto";
import { ForumSchema } from "./forum-schema.dto";

export const ForumUpdateSchema = ForumSchema.pick({ id: true }).extend({
  ...ForumCreateSchema.partial().shape,
});

export type ForumUpdateDto = z.infer<typeof ForumUpdateSchema>;
