import { z } from "zod";
import { AmbassadorCreateSchema } from "./ambassador-create.dto";

export const AmbassadorUpdateSchema = AmbassadorCreateSchema.partial();

export type AmbassadorUpdateDto = z.infer<typeof AmbassadorUpdateSchema>;
