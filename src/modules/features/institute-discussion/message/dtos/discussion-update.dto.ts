import { z } from "zod";
import { DiscussionModel } from "../discussion.model";

export const DiscussionUpdateSchema = DiscussionModel.dbSchema.pick({
  id: true,
  message: true,
});

export type DiscussionUpdateDto = z.infer<typeof DiscussionUpdateSchema>;
