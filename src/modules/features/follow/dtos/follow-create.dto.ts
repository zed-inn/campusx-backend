import { z } from "zod";
import { ProfileModel } from "@modules/core/profile";

export const FollowActionSchema = z.object({
  userId: ProfileModel.fields.id,
});

export type FollowActionDto = z.infer<typeof FollowActionSchema>;
