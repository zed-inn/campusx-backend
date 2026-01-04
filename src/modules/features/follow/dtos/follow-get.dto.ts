import { ProfileModel } from "@modules/core/profile";
import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const FollowGetSchema = z.object({
  page: GlobalSchema.fields.page,
  userId: ProfileModel.fields.id,
});

export type FollowGetDto = z.infer<typeof FollowGetSchema>;

export const FollowGetMineSchema = FollowGetSchema.pick({
  page: true,
});

export type FollowGetMineDto = z.infer<typeof FollowGetMineSchema>;
