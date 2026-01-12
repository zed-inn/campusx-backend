import { z } from "zod";
import { AmbassadorModel } from "../../ambassador.model";

export const AmbassadorDeleteSchema = AmbassadorModel.dbSchema.pick({
  userId: true,
});

export type AmbassadorDeleteDto = z.infer<typeof AmbassadorDeleteSchema>;
