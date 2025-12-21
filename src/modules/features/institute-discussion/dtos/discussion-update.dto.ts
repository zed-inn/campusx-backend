import { z } from "zod";
import { DiscussionInterface } from "../interfaces/discussion.interface";

export const DiscussionUpdateSchema = z.object({
  id: DiscussionInterface.fields.id,
  message: DiscussionInterface.fields.message,
});

export type DiscussionUpdateDto = z.infer<typeof DiscussionUpdateSchema>;
