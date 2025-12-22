import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { ProfileInterface } from "@modules/core/profile";
import { InstituteInterface } from "@modules/core/institutes";

export const ReviewInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Review Id"),
    userId: z.uuidv4("Invalid User Id"),
    instituteId: z.uuidv4("Invalid Institute Id"),
    body: z.string("Invalid Body"),
    rating: z
      .int("Invalid Rating")
      .min(0, { error: "Rating cannot be lower than 1" })
      .max(5, { error: "Rating cannot be higher than 5" }),
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
      name: InstituteInterface.fields.name,
    }),
  }
);

export type ReviewAttributes = z.infer<typeof ReviewInterface.dbSchema>;

export type ReviewCreationAttributes = Omit<
  z.infer<typeof ReviewInterface.dbFields>,
  "id"
>;
