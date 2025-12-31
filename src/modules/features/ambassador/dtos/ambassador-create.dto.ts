import { z } from "zod";
import { AmbassadorModel } from "../ambassador.model";

export const AmbassadorCreateSchema = AmbassadorModel.dbSchema.pick({
  instituteId: true,
  reason: true,
});

export type AmbassadorCreateDto = z.infer<typeof AmbassadorCreateSchema>;
