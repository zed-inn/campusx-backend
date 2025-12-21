import { z } from "zod";
import { DiscussionInterface } from "../interfaces/discussion.interface";
import { ProfileInterface } from "@modules/core/profile";
import { InstituteInterface } from "@modules/core/institutes";

export const DiscussionFullSchema = z.object({
  ...DiscussionInterface.fields,
  writer: ProfileInterface.dbSchema,
  institute: InstituteInterface.dbSchema,
  parentMessage: z
    .object({
      ...DiscussionInterface.fields,
      writer: ProfileInterface.dbSchema,
      institute: ProfileInterface.dbSchema,
    })
    .nullable()
    .default(null),
  isLiked: z.boolean().default(false),
});

export type DiscussionFullDto = z.infer<typeof DiscussionFullSchema>;
