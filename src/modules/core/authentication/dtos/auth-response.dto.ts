import { z } from "zod";
import { ProfileInterface } from "@modules/core/profile";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid authentication token" }),
  user: z
    .object({
      id: ProfileInterface.fields.id,
      fullName: ProfileInterface.fields.fullName,
    })
    .nullable(),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
