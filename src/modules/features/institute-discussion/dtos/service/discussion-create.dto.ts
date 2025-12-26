import { z } from "zod";
import { DiscussionSchema } from "./discussion-schema.dto";

export const DiscussionCreateSchema = DiscussionSchema.pick({
  instituteId: true,
  message: true,
  replyingTo: true,
});

export type DiscussionCreateDto = z.infer<typeof DiscussionCreateSchema>;
