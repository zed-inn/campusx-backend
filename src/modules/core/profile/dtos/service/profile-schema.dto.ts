import { z } from "zod";
import { ProfileInterface } from "../../interfaces/profile.interface";
import { InstituteSchema } from "@modules/core/institutes";

export const ProfileSchema = ProfileInterface.dbSchema.extend({
  ...ProfileInterface.extra.schema.pick({ isFollowed: true }).shape,

  // From Feature: Ambassador
  ambassador: z
    .object({
      institute: InstituteSchema,
    })
    .nullable(),
});

export type ProfileSchemaDto = z.infer<typeof ProfileSchema>;
