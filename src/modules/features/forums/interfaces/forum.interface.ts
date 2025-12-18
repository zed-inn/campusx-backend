import { ProfileInterface } from "@modules/core/profile";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const ForumInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Forum Id"),
    localId: z.string("Invalid Local Id").nullable(),
    userId: z.uuidv4("Invalid User Id"),
    title: z.string("Invalid Title").min(1, { error: "Title is too short" }),
    body: z.string("Invalid Body").nullable(),
    imageUrl: z.url("Invalid Image Url").nullable(),
    commentsCount: z.number().nonnegative().default(0),
    likesCount: z.number().nonnegative().default(0),
  },
  {
    writer: z.object({
      id: ProfileInterface.fields.id,
      fullName: ProfileInterface.fields.fullName,
      avatarUrl: ProfileInterface.fields.avatarUrl,
    }),
    isLiked: z.boolean().default(false),
  }
);

export type ForumAttributes = z.infer<typeof ForumInterface.dbSchema>;

export type ForumCreationAttributes = Omit<
  z.infer<typeof ForumInterface.dbFields>,
  "id" | "commentsCount" | "likesCount"
>;
