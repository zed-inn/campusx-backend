import { z } from "zod";
import { ProfileResponseMinSchema } from "@modules/core/profile/dtos/controller/profile-response.dto";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid authentication token" }),
  user: ProfileResponseMinSchema,
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
