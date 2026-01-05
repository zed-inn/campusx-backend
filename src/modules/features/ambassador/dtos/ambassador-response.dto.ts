import { ShortInstituteSchema } from "@modules/core/institutes";
import { AmbassadorModel } from "../ambassador.model";
import { z } from "zod";

export const AmbassadorSchema = AmbassadorModel.dbSchema.extend({
  institute: ShortInstituteSchema,
});

export type AmbassadorDto = z.infer<typeof AmbassadorSchema>;
