import bcrypt from "bcryptjs";
import { AppError } from "@shared/errors/app-error";
import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { UserService } from "@modules/core/user";
import { ProfileService } from "@modules/core/profile";
import { LoginBasicDto } from "../dtos/login-basic.dto";

export class LoginService {
  static loginBasic = async (data: LoginBasicDto) => {
    if (!data.email && !data.username)
      throw new AppError("Email or username is required.", 400);

    const user = data.email
      ? await UserService.getByEmail(data.email)
      : data.username
      ? await UserService.getById(
          (
            await ProfileService.getByUsername(data.username)
          ).id
        )
      : null;

    if (!user) throw new AppError("Invalid Request.", 401);

    if (!user.passwordHash) throw new AppError("Invalid Request.", 406);

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!passwordMatch) throw new AppError("Unauthorized.", 401);

    const authPayload: AuthPayloadType = { id: user.id };
    const authToken = await TokenService.issueToken(authPayload);

    try {
      const profile = await ProfileService.getById(user.id);
      return { authToken, user: profile };
    } catch {}

    return { authToken, user: null };
  };
}
