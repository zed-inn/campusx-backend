import { z } from "zod";

export const ForumCreateSchema = z.object({
  localId: z.string().nullable(),
  title: z.string({ error: "Invalid Title" }),
  body: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export type ForumCreateDto = z.infer<typeof ForumCreateSchema>;
