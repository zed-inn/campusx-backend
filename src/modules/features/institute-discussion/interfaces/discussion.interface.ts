import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { ProfileInterface } from "@modules/core/profile";
import { InstituteInterface } from "@modules/core/institutes";

export const DiscussionInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Discussion Id"),
    userId: z.uuidv4("Invalid User Id"),
    instituteId: z.uuidv4("Invalid Institute Id"),
    message: z
      .string("Invalid Message")
      .min(1, { error: "Message must contain one letter atleast" }),
    replyingTo: z.uuidv4("Invalid Discussion Id To Reply").nullable(),
  },
  {
    writer: z.object({
      id: ProfileInterface.fields.id,
      fullName: ProfileInterface.fields.fullName,
      username: ProfileInterface.fields.username,
      avatarUrl: ProfileInterface.fields.avatarUrl,
      isFollowed: ProfileInterface.extra.fields.isFollowed,
    }),
    institute: z.object({
      id: InstituteInterface.fields.id,
    }),
    isLiked: z.boolean(),
  }
);

export type DiscussionAttributes = z.infer<typeof DiscussionInterface.dbSchema>;

export type DiscussionCreationAttributes = Omit<
  z.infer<typeof DiscussionInterface.dbFields>,
  "id"
>;
