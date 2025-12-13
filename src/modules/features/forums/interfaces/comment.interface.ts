import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const CommentFields = z.object({
  id: z.uuidv4(),
  localId: z.string().nullable(),
  profileId: z.uuidv4(),
  forumId: z.uuidv4(),
  replyingTo: z.uuidv4().nullable(),
  body: z.string(),
  replies: z.number().positive().default(0),
});

export const CommentDbSchema = BaseSchema.extend(CommentFields.shape);

export type CommentAttributes = z.infer<typeof CommentDbSchema>;

export type CommentCreationAttributes = Omit<
  z.infer<typeof CommentFields>,
  "id" | "replies"
>;
