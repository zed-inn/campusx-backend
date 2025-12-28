import { z } from "zod";
import { AmbassadorInterface } from "../../ambassador.interface";
import { ProfileSchema } from "@modules/core/profile";

export const AmbassadorSchema = AmbassadorInterface.dbSchema.extend({
  user: ProfileSchema,
});

export type AmbassadorDto = z.infer<typeof AmbassadorSchema>;
