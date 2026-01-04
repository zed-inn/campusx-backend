import { UserSchema } from "@modules/core/profile";
import { z } from "zod";

export const AuthResponseSchema = z.object({
  authToken: z.string({ error: "Invalid Authentication Token" }),
  user: UserSchema.nullable().default(null),
});

export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;
