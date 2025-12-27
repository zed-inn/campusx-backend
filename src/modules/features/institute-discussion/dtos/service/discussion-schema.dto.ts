import { z } from "zod";
import { DiscussionInterface } from "../../interfaces/discussion.interface";
import { ProfileSchema } from "@modules/core/profile";
import { InstituteSchema } from "@modules/core/institutes";

export const DiscussionSchema = DiscussionInterface.dbSchema.extend({
  writer: ProfileSchema,
  parentMessage: DiscussionInterface.dbSchema
    .extend({
      writer: ProfileSchema,
    })
    .nullable()
    .default(null),
  institute: InstituteSchema,
  isLiked: DiscussionInterface.extra.fields.isLiked,
});

export type DiscussionDto = z.infer<typeof DiscussionSchema>;
