import { z } from "zod";
import { AmbassadorSchema } from "../service/ambassador-schema.dto";
import { InstituteResMin } from "@modules/core/institutes";

export const AmbassadorResponseSchema = AmbassadorSchema.pick({
  status: true,
  reasonToBecome: true,
}).extend({
  institute: InstituteResMin,
});

export type AmbassadorResponseDto = z.infer<typeof AmbassadorResponseSchema>;
