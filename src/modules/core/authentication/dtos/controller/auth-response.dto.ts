import { z } from "zod";
import { ProfileResMin } from "@modules/core/profile";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid authentication token" }),
  user: ProfileResMin.nullable().default(null),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
