import { z } from "zod";
import { DiscussionInterface } from "../interfaces/discussion.interface";

export const DiscussionCreateSchema = z.object({
  instituteId: DiscussionInterface.fields.instituteId,
  message: DiscussionInterface.fields.message,
  replyingTo: DiscussionInterface.fields.replyingTo.default(null),
});

export type DiscussionCreateDto = z.infer<typeof DiscussionCreateSchema>;
