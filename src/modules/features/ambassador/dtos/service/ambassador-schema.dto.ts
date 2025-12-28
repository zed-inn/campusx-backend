import { z } from "zod";
import { InstituteSchema } from "@modules/core/institutes";
import { AmbassadorInterface } from "../../ambassador.interface";
import { ProfileSchema } from "@modules/core/profile";

export const AmbassadorSchema = AmbassadorInterface.dbSchema.extend({
  institute: InstituteSchema,
  user: ProfileSchema,
});

export type AmbassadorDto = z.infer<typeof AmbassadorSchema>;
