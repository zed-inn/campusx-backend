import { z } from "zod";
import { CreateFullSchema } from "./profile-create.dto";

export const ProfileUpdateSchema = CreateFullSchema.partial();

export type ProfileUpdateDto = z.infer<typeof ProfileUpdateSchema>;
