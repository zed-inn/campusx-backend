import bcrypt from "bcryptjs";
import { AppError } from "@shared/errors/app-error";
import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { UserService } from "@modules/core/user";
import {
  ProfileResponseDto,
  ProfileResponseSchema,
  ProfileService,
} from "@modules/core/profile";
import { LoginPasswordDto } from "../dtos/login-password.dto";
import { AuthResponseDto } from "../dtos/auth-response.dto";

export class LoginService {
  static loginWithPassword = async (
    data: LoginPasswordDto
  ): Promise<AuthResponseDto> => {
    const user = data.email
      ? await UserService.getUserByEmail(data.email)
      : await UserService.getUserByProfileUsername(data.username ?? "");

    if (!user.passwordHash) throw new AppError("Invalid Request.", 403);

    const passMatched = await bcrypt.compare(data.password, user.passwordHash);
    if (!passMatched) throw new AppError("Access denied.", 401);

    const authPayload: AuthPayloadType = { id: user.id };
    const authToken = await TokenService.issueToken(authPayload);

    let profile: ProfileResponseDto | null = null;
    if (user.profiled)
      profile = ProfileResponseSchema.parse(
        await ProfileService.getProfileByID(user.id)
      );

    return { authToken, user: profile };
  };
}
