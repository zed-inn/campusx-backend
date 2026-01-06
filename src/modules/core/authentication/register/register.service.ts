import { ReferralUseService, UserService } from "@modules/core/user";
import { OtpService } from "../otp/otp.service";
import {
  RegisterBasicDto,
  RegisterGoogleDto,
  RegisterReferralUseDto,
  RegisterReferralUseSchema,
} from "./dtos/register.dto";
import { AuthService } from "../auth.service";
import db from "@config/database";
import { ProfileService } from "@modules/core/profile";

class _RegisterService {
  createBasic = async (data: RegisterBasicDto) => {
    const email = await OtpService.getEmailFromOtpToken(data.otpToken);

    await db.transaction(async () => {
      const user = await UserService.createWithPassword({
        email,
        password: data.password,
        role: "STUDENT",
      });

      await this.registerReferralCode(
        RegisterReferralUseSchema.parse(data),
        user.plain.id
      );

      return AuthService.createAuthResponse(user.plain);
    });
  };

  createGoogle = async (data: RegisterGoogleDto) => {
    const { email, ...sData } = data;

    return await db.transaction(async () => {
      const user = await UserService.createWithoutPassword({
        email,
        role: "STUDENT",
      });

      await this.registerReferralCode(
        RegisterReferralUseSchema.parse(data),
        user.plain.id
      );

      await ProfileService.createStudent(sData, user.dataValues.id);

      return AuthService.createAuthResponse(user.plain);
    });
  };

  registerReferralCode = async (
    data: RegisterReferralUseDto,
    userId: string
  ) => {
    if (!data.referralCode || !data.deviceId) return;

    const referrer = await UserService.getByReferralCode(data.referralCode);
    await ReferralUseService.createNew({
      deviceId: data.deviceId,
      referralCodeUsed: data.referralCode,
      referrerId: referrer.plain.id,
      userId,
    });
  };
}

export const RegisterService = new _RegisterService();
