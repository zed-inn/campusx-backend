import { UserService } from "@modules/core/user";
import { OtpService } from "../otp/otp.service";
import { RecoverPasswordDto } from "./dtos/recovery.dto";

class _RecoveryService {
  resetPasswordBasic = async (data: RecoverPasswordDto) => {
    const email = await OtpService.getEmailFromOtpToken(data.otpToken);

    await UserService.updatePasswordByEmail({ email, password: data.password });
  };
}

export const RecoveryService = new _RecoveryService();
