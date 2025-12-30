import { z } from "zod";

export const AuthPayloadSchema = z.object({
  id: z.uuidv4({ error: "Invalid User Id" }),
  role: z.string("Invalid Role").optional(),
});

export type AuthPayloadType = z.infer<typeof AuthPayloadSchema>;
