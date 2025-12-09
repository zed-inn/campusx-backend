import { z } from "zod";

export const USER_TYPES = ["normal"];

export const AuthPayloadSchema = z.object({
  id: z.uuidv4({ error: "Invalid User Id" }),
  role: z.enum(USER_TYPES).default("normal").optional(),
});

export type AuthPayloadType = z.infer<typeof AuthPayloadSchema>;
