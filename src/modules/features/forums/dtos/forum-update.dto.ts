import { z } from "zod";

export const ForumUpdateSchema = z.object({
  id: z.uuidv4({ error: "Invalid Id" }),
  localId: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
});

export type ForumUpdateDto = z.infer<typeof ForumUpdateSchema>;
