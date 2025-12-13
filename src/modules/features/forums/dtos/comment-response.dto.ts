import { ProfileResponseSchema } from "@modules/core/profile";
import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const CommentResponseSchema = BaseSchema.extend({
  id: z.uuidv4(),
  forumId: z.uuidv4(),
  profileId: z.uuidv4(),
  localId: z.string().nullable(),
  replyingTo: z.uuidv4().nullable(),
  body: z.string(),
  replies: z.number().positive().default(0),
  writer: ProfileResponseSchema,
});

export type CommentResponseDto = z.infer<typeof CommentResponseSchema>;
