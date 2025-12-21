import { z } from "zod";
import { DiscussionInterface } from "../interfaces/discussion.interface";
import { BaseSchema } from "@shared/dtos/base.dto";

export const DiscussionResponseSchema = BaseSchema.extend({
  id: DiscussionInterface.fields.id,
  message: DiscussionInterface.fields.message,
  instituteId: DiscussionInterface.fields.instituteId,
  writer: DiscussionInterface.extra.fields.writer,
  parentMessage: z.object({
    id: DiscussionInterface.fields.id,
    message: DiscussionInterface.fields.message,
    writer: DiscussionInterface.extra.fields.writer,
  }),
});

export type DiscussionResponseDto = z.infer<typeof DiscussionResponseSchema>;
