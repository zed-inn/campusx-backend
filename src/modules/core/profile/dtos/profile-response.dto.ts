import { z } from "zod";
import { ProfileModel } from "../profile.model";
import { ShortInstituteSchema } from "@modules/core/institutes";

export const UserSchema = ProfileModel.dbSchema.extend({
  isFollowed: z.boolean("Invalid isFollowed").default(false),
  stats: z
    .object({
      followers: z.number().nonnegative().default(0),
      following: z.number().nonnegative().default(0),
    })
    .default({ followers: 0, following: 0 }),
  ambassadorOf: ShortInstituteSchema.nullable().default(null),
});

export type UserDto = z.infer<typeof UserSchema>;

export const ShortUserSchema = UserSchema.pick({
  id: true,
  fullName: true,
  username: true,
  avatarUrl: true,
  isFollowed: true,
  ambassadorOf: true,
});

export type ShortUserDto = z.infer<typeof ShortUserSchema>;
