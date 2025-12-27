import { z } from "zod";
import { InstituteSchema } from "@modules/core/institutes/dtos/service/institute-schema.dto";
import { DiscussionSchema } from "../service/discussion-schema.dto";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";

export const DiscussionResponseSchema = DiscussionSchema.pick({
  createDate: true,
  id: true,
  isLiked: true,
  message: true,
  replyingTo: true,
  updateDate: true,
  writer: true,
}).extend({
  institute: InstituteSchema.pick({ name: true }),
  parentMessage: DiscussionSchema.pick({
    id: true,
    message: true,
  }).extend({
    writer: ProfileResponseMinSchema,
  }),
});

export type DiscussionResponseDto = z.infer<typeof DiscussionResponseSchema>;
