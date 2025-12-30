import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { UserService } from "@modules/core/user";
import { OtpService } from "./otp.service";

export class SignupService {
  static createPassword = async (otpToken: string, password: string) => {
    const email = await OtpService.getEmailFromOtpToken(otpToken);

    const user = (await UserService.createWithPassword({ email, password }))
      .data;

    const authPayload: AuthPayloadType = { id: user.id, role: user.role };
    const authToken = await TokenService.issueToken(authPayload);

    return { authToken, user: null };
  };
}
