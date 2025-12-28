import { z } from "zod";
import { ProfileSchema } from "../service/profile-schema.dto";
import { InstituteResMin } from "@modules/core/institutes";

export const ProfileResponseMaxSchema = ProfileSchema.extend({
  ambassador: z.object({
    institute: InstituteResMin.pick({ id: true, name: true }).nullable(),
  }),
});

export const ProfileResponseMinSchema = ProfileSchema.pick({
  id: true,
  username: true,
  fullName: true,
  avatarUrl: true,
  isFollowed: true,
}).extend({
  ambassador: z
    .object({
      institute: InstituteResMin.pick({ id: true, name: true }),
    })
    .nullable(),
});

export type ProfileResponseMinDto = z.infer<typeof ProfileResponseMinSchema>;

export type ProfileResponseMaxDto = z.infer<typeof ProfileResponseMaxSchema>;
