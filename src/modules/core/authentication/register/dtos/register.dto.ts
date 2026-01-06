import { ProfileModel } from "@modules/core/profile";
import { PasswordSchema, UserModel } from "@modules/core/user";
import { z } from "zod";

export const RegisterReferralUseSchema = z.object({
  referralCode: z.string().nullable().default(null),
  deviceId: z.string("Invalid Device Id").nullable().default(null),
});

export type RegisterReferralUseDto = z.infer<typeof RegisterReferralUseSchema>;

export const RegisterBasicSchema = RegisterReferralUseSchema.extend({
  otpToken: z.string("Invalid Otp Token"),
  password: PasswordSchema,
});

export type RegisterBasicDto = z.infer<typeof RegisterBasicSchema>;

export const RegisterGoogleSchema = RegisterReferralUseSchema.extend({
  fullName: ProfileModel.fields.fullName,
  avatarUrl: ProfileModel.fields.avatarUrl.default(null),
  email: UserModel.fields.email,
});

export type RegisterGoogleDto = z.infer<typeof RegisterGoogleSchema>;
