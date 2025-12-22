import { z } from "zod";
import { ProfileInterface } from "../interfaces/profile.interface";

export const ProfileFullSchema = ProfileInterface.dbSchema.extend({
  ...ProfileInterface.extra.fields,
});

export type ProfileFullDto = z.infer<typeof ProfileFullSchema>;
