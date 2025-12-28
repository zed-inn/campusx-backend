import { z } from "zod";
import { AmbassadorInterface } from "../../ambassador.interface";
import { ProfileSchema } from "@modules/core/profile";
import { InstituteSchema } from "@modules/core/institutes";

export const AmbassadorSchema = AmbassadorInterface.dbSchema.extend({
  user: ProfileSchema,
  institute: InstituteSchema,
});

export type AmbassadorDto = z.infer<typeof AmbassadorSchema>;
