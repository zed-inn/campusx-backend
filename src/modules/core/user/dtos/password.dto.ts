import { z } from "zod";

export const PasswordSchema = z
  .string("Invalid Password")
  .min(8, { error: "Password cannot be shorter than 8 characters" });
