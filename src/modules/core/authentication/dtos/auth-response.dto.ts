import { z } from "zod";
import { ProfileResponseSchema } from "@modules/core/profile";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid authentication token" }),
  user: ProfileResponseSchema.nullable(),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
