import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const LikeInterface = modelSchema({
  userId: z.uuidv4("Invalid User Id"),
  discussionId: z.uuidv4("Invalid Discussion Id"),
});

export type LikeAttributes = z.infer<typeof LikeInterface.dbSchema>;

export type LikeCreationAttributes = Omit<
  z.infer<typeof LikeInterface.dbFields>,
  never
>;
