import { z } from "zod";
import { ProfileResponseShort } from "@modules/core/user-profile";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid Authentication Token" }),
  user: ProfileResponseShort.nullable().default(null),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
