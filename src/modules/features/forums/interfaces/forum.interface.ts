import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const ForumFields = z.object({
  id: z.uuidv4(),
  localId: z.string().nullable(),
  profileId: z.uuidv4(),
  title: z.string(),
  body: z.string().nullable(),
  imageUrl: z.url().nullable(),
  comments: z.number().positive().default(0),
  likes: z.number().positive().default(0),
});

export const ForumDbSchema = BaseSchema.extend(ForumFields.shape);

export type ForumAttributes = z.infer<typeof ForumDbSchema>;

export type ForumCreationAttributes = Omit<
  z.infer<typeof ForumFields>,
  "id" | "comments" | "likes"
>;
