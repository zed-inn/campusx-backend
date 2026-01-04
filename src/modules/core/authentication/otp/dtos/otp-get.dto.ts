import { UserModel } from "@modules/core/user";
import { z } from "zod";

export const OtpGetSchema = z.object({
  email: UserModel.fields.email,
});

export type OtpGetDto = z.infer<typeof OtpGetSchema>;
