import { z } from "zod";
import { AmbassadorSchema } from "./ambassador-schema.dto";

export const AmbassadorUpdateSchema = AmbassadorSchema.pick({
  instituteId: true,
  reasonToBecome: true,
  status: true,
}).partial();

export type AmbassadorUpdateDto = z.infer<typeof AmbassadorUpdateSchema>;
