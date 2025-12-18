import { z } from "zod";
import { BaseSchema } from "@shared/dtos/base.dto";
import { ProfileInterface } from "../profile.interface";

export const ProfileResponseSchema = ProfileInterface.dbSchema;

export type ProfileResponseDto = z.infer<typeof ProfileResponseSchema>;
