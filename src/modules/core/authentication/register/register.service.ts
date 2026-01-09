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
import { WalletService } from "@modules/core/wallet";
import { WALLET } from "@config/constants/coins-per-action";

class _RegisterService {
  createBasic = async (data: RegisterBasicDto) => {
    const email = await OtpService.getEmailFromOtpToken(data.otpToken);

    return await db.transaction(async () => {
      const user = await UserService.createWithPassword({
        email,
        password: data.password,
        role: "STUDENT",
      });
      const userData = user.plain;

      await this.registerReferralCode(
        RegisterReferralUseSchema.parse(data),
        userData.id
      );

      await this.availWalletOffer(userData.id);

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
      const userData = user.plain;

      await this.registerReferralCode(
        RegisterReferralUseSchema.parse(data),
        userData.id
      );

      await this.availWalletOffer(userData.id);

      await ProfileService.createStudent(sData, userData.id);

      return AuthService.createAuthResponse(user.plain);
    });
  };

  registerReferralCode = async (
    data: RegisterReferralUseDto,
    userId: string
  ) => {
    if (!data.referralCode || !data.deviceId) return;

    try {
      const referrer = await UserService.getByReferralCode(data.referralCode);
      const referrerData = referrer.plain;
      await ReferralUseService.createNew({
        deviceId: data.deviceId,
        referralCodeUsed: data.referralCode,
        referrerId: referrerData.id,
        userId,
      });

      await WalletService.updateBalanceByUserId(WALLET.REFERRAL, userId);
      await WalletService.updateBalanceByUserId(
        WALLET.REFERRAL,
        referrerData.id
      );
    } catch {}
  };

  availWalletOffer = async (userId: string) => {
    await WalletService.updateBalanceByUserId(WALLET.REGISTRATION, userId);
  };
}

export const RegisterService = new _RegisterService();
