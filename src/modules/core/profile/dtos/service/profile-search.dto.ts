import { ProfileSchema } from "./profile-schema.dto";
import { z } from "zod";

export const ProfileSearchSchema = ProfileSchema.pick({
  username: true,
  fullName: true,
  gender: true,
}).partial();

export type ProfileSearchDto = z.infer<typeof ProfileSearchSchema>;
