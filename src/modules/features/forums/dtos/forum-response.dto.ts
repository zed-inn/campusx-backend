import { ProfileResponseSchema } from "@modules/core/profile";
import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const ForumResponseSchema = BaseSchema.extend({
  id: z.uuidv4(),
  localId: z.string().nullable(),
  title: z.string(),
  body: z.string().nullable(),
  imageUrl: z.url().nullable(),
  comments: z.number().positive().default(0),
  likes: z.number().positive().default(0),
  writer: ProfileResponseSchema,
});

export type ForumResponseDto = z.infer<typeof ForumResponseSchema>;
