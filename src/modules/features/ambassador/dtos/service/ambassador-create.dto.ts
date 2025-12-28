import { AmbassadorSchema } from "./ambassador-schema.dto";
import { z } from "zod";

export const AmbassadorCreateSchema = AmbassadorSchema.pick({
  instituteId: true,
  reasonToBecome: true,
});

export type AmbassadorCreateDto = z.infer<typeof AmbassadorCreateSchema>;
