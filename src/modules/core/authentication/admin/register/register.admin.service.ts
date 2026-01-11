import { env } from "@config/env";
import { RegisterCreateBasicDto } from "./dtos/register-action.admin.dto";
import { AppError } from "@shared/errors/app-error";
import { UserService } from "@modules/core/user";
import { AuthService } from "@modules/core/authentication/auth.service";

export class RegisterService {
  static basic = async (data: RegisterCreateBasicDto) => {
    if (data.adminCode !== env.ADMIN_CODE)
      throw new AppError("Admin code did not match", 400);

    const user = await UserService.createWithPassword({
      email: data.email,
      password: data.password,
      role: "ADMIN",
    });

    return AuthService.createAuthResponse(user.plain);
  };
}
