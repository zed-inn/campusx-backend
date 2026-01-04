import bcrypt from "bcryptjs";
import { UserService } from "@modules/core/user";
import { ProfileService } from "@modules/core/profile";
import { AppError } from "@shared/errors/app-error";
import { DB_Errors } from "@shared/errors/db-errors";
import { AuthService } from "../auth.service";
import { LoginGoogleDto } from "./dtos/login.dto";
import { RegisterService } from "../register/register.service";

export class _LoginService {
  loginBasicWithEmail = async (email: string, password: string) => {
    const user = await UserService.getByEmail(email);
    const userData = user.plain;

    if (!userData.passwordHash) throw DB_Errors.notFound;
    const passwordMatch = await bcrypt.compare(password, userData.passwordHash);
    if (!passwordMatch) throw new AppError("Unauthorized", 401);

    return AuthService.createAuthResponse(userData);
  };

  loginBasicWithUsername = async (username: string, password: string) => {
    const profile = await ProfileService.getByUsername(username);
    const user = await UserService.getById(profile.dataValues.id);
    const userData = user.plain;

    if (!userData.passwordHash) throw DB_Errors.notFound;
    const passwordMatch = await bcrypt.compare(password, userData.passwordHash);
    if (!passwordMatch) throw new AppError("Unauthorized", 401);

    return AuthService.createAuthResponse(userData);
  };

  loginGoogle = async (data: LoginGoogleDto) => {
    try {
      const user = await UserService.getByEmail(data.email);
      return AuthService.createAuthResponse(user.plain);
    } catch {
      return RegisterService.createGoogle(data);
    }
  };
}

export const LoginService = new _LoginService();
