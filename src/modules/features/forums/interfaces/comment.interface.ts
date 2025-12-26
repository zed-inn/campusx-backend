import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const CommentInterface = modelSchema({
  id: z.uuidv4("Invalid Comment Id"),
  localId: z.string("Invalid Local Id").nullable().default(null),
  userId: z.uuidv4("Invalid User Id"),
  forumId: z.uuidv4("Invalid Forum Id"),
  replyingTo: z.uuidv4("Invalid Parent Comment Id").nullable().default(null),
  body: z.string("Invalid Body"),
  repliesCount: z.number().nonnegative().default(0),
});

export type CommentAttributes = z.infer<typeof CommentInterface.dbSchema>;

export type CommentCreationAttributes = Omit<
  z.infer<typeof CommentInterface.dbFields>,
  "id" | "repliesCount"
>;
