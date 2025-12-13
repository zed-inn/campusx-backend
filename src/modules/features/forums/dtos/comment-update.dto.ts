import { z } from "zod";

export const CommentUpdateSchema = z.object({
  id: z.uuidv4("Invalid comment Id"),
  localId: z.string("Invalid localId").nullable(),
  body: z.string("Invalid comment").nullable(),
});

export type CommentUpdateDto = z.infer<typeof CommentUpdateSchema>;
