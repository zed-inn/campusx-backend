import { UserService } from "@modules/core/user";
import { LoginBasicDto } from "./dtos/login-action.admin.dto";
import bcrypt from "bcryptjs";
import { AppError } from "@shared/errors/app-error";
import { AuthService } from "@modules/core/authentication/auth.service";

export class LoginService {
  static basic = async (data: LoginBasicDto) => {
    const user = (await UserService.getByEmail(data.email)).plain;

    if (user.role !== "ADMIN") throw new AppError("Forbidden", 403);

    const passwordMatched = await bcrypt.compare(
      data.password,
      user.passwordHash as string
    );
    if (!passwordMatched) throw new AppError("Unauthorized", 401);

    return await AuthService.createAuthResponse(user);
  };
}
