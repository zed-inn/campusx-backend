import { z } from "zod";
import { ProfileInterface } from "../interfaces/profile.interface";

export const ProfileResponseSchema = ProfileInterface.dbSchema;

export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
