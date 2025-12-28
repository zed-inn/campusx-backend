import { z } from "zod";
import { DiscussionSchema } from "../service/discussion-schema.dto";
import { ProfileResMin } from "@modules/core/profile";
import { InstituteSchema } from "@modules/core/institutes";

export const DiscussionResponseSchema = DiscussionSchema.pick({
  createDate: true,
  id: true,
  isLiked: true,
  message: true,
  replyingTo: true,
  updateDate: true,
}).extend({
  writer: ProfileResMin,
  institute: InstituteSchema.pick({ name: true }),
  parentMessage: DiscussionSchema.pick({
    id: true,
    message: true,
  }).extend({
    writer: ProfileResMin,
  }),
});

export type DiscussionResponseDto = z.infer<typeof DiscussionResponseSchema>;
