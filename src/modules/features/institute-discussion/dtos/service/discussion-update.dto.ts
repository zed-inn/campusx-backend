import { z } from "zod";
import { DiscussionSchema } from "./discussion-schema.dto";

export const DiscussionUpdateSchema = DiscussionSchema.pick({
  id: true,
  message: true,
});

export type DiscussionUpdateDto = z.infer<typeof DiscussionUpdateSchema>;
