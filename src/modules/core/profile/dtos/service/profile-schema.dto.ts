import { z } from "zod";
import { ProfileInterface } from "../../interfaces/profile.interface";

export const ProfileSchema = ProfileInterface.dbSchema.extend({
  ...ProfileInterface.extra.schema.pick({ isFollowed: true }).shape,
});

export type ProfileSchemaDto = z.infer<typeof ProfileSchema>;
