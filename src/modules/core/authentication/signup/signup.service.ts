import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { UserService } from "@modules/core/user";
import { OtpService } from "../otp/otp.service";
import { CreatePasswordDto } from "./dtos/create-password.dto";

export class SignupService {
  static createPassword = async (data: CreatePasswordDto) => {
    const email = await OtpService.getEmailFromOtpToken(data.otpToken);

    const service = await UserService.createWithPassword({
      email,
      password: data.password,
      role: "STUDENT",
    });

    const user = service.data;

    const authPayload: AuthPayloadType = { id: user.id, role: user.role };
    const authToken = await TokenService.issueToken(authPayload);

    return { authToken, user: null };
  };
}
