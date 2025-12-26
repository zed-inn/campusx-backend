import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const ForumInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Forum Id"),
    localId: z.string("Invalid Local Id").nullable().default(null),
    userId: z.uuidv4("Invalid User Id"),
    title: z.string("Invalid Title").min(1, { error: "Title is too short" }),
    body: z.string("Invalid Body").nullable().default(null),
    imageUrl: z.url("Invalid Image Url").nullable().default(null),
    commentsCount: z.number().nonnegative().default(0),
    likesCount: z.number().nonnegative().default(0),
  },
  {
    isLiked: z.boolean("Invalid isLiked Value").default(false),
  }
);

export type ForumAttributes = z.infer<typeof ForumInterface.dbSchema>;

export type ForumCreationAttributes = Omit<
  z.infer<typeof ForumInterface.dbFields>,
  "id" | "commentsCount" | "likesCount"
>;
