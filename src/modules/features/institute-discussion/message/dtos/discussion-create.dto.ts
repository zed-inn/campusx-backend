import { z } from "zod";
import { DiscussionModel } from "../discussion.model";

export const DiscussionCreateSchema = DiscussionModel.dbSchema.pick({
  instituteId: true,
  message: true,
  replyingTo: true,
});

export type DiscussionCreateDto = z.infer<typeof DiscussionCreateSchema>;
