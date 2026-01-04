import { UserService } from "@modules/core/user";
import { OtpService } from "../otp/otp.service";
import { RegisterBasicDto, RegisterGoogleDto } from "./dtos/register.dto";
import { AuthService } from "../auth.service";
import db from "@config/database";
import { ProfileService } from "@modules/core/profile";

class _RegisterService {
  createBasic = async (data: RegisterBasicDto) => {
    const email = await OtpService.getEmailFromOtpToken(data.otpToken);

    const user = await UserService.createWithPassword({
      email,
      password: data.password,
      role: "STUDENT",
    });

    return AuthService.createAuthResponse(user.plain);
  };

  createGoogle = async (data: RegisterGoogleDto) => {
    const { email, ...sData } = data;

    return await db.transaction(async () => {
      const user = await UserService.createWithoutPassword({
        email,
        role: "STUDENT",
      });

      await ProfileService.createStudent(sData, user.dataValues.id);

      return AuthService.createAuthResponse(user.plain);
    });
  };
}

export const RegisterService = new _RegisterService();
