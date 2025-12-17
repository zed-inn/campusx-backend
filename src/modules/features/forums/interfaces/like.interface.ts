import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const LikeInterface = modelSchema({
  forumId: z.uuidv4("Invalid Forum Id"),
  userId: z.uuidv4("Invalid User Id"),
});

export type LikeAttributes = z.infer<typeof LikeInterface.dbSchema>;

export type LikeCreationAttributes = Omit<
  z.infer<typeof LikeInterface.dbFields>,
  never
>;
