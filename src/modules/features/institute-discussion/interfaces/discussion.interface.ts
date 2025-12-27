import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { InstituteSchema } from "@modules/core/institutes";

export const DiscussionInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Discussion Id"),
    userId: z.uuidv4("Invalid User Id"),
    instituteId: z.uuidv4("Invalid Institute Id"),
    message: z
      .string("Invalid Message")
      .min(1, { error: "Message must contain one letter atleast" }),
    replyingTo: z
      .uuidv4("Invalid Discussion Id To Reply")
      .nullable()
      .default(null),
  },
  {
    institute: InstituteSchema.pick({ id: true }),
    isLiked: z.boolean().default(false),
  }
);

export type DiscussionAttributes = z.infer<typeof DiscussionInterface.dbSchema>;

export type DiscussionCreationAttributes = Omit<
  z.infer<typeof DiscussionInterface.dbFields>,
  "id"
>;
