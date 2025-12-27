import bcrypt from "bcryptjs";
import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { UserService } from "@modules/core/user";
import { ProfileService } from "@modules/core/profile";
import { LoginBasicDto } from "../dtos/service/login-basic.dto";
import { AuthErrors } from "../auth.errors";
import { LoginGoogleDto } from "../dtos/service/login-google.dto";
import db from "@config/database";

export class LoginService {
  static loginBasic = async (data: LoginBasicDto) => {
    if (!data.email && !data.username) throw AuthErrors.noEmailOrUsernameGiven;

    // Get user from db
    let user: UserService["data"] | null = null;
    if (data.email) user = (await UserService.getByEmail(data.email)).data;
    else if (data.username) {
      const profile = await ProfileService.getByUsername(data.username);
      user = (await UserService.getById(profile.data.id)).data;
    }

    // Auth checks
    if (!user) throw AuthErrors.unauthorized;
    if (!user.passwordHash) throw AuthErrors.unauthorized;
    const passwordMatch = await bcrypt.compare(
      data.password,
      user.passwordHash
    );
    if (!passwordMatch) throw AuthErrors.unauthorized;

    // Create payload
    return LoginUtils.createPayload(user);
  };

  static loginGoogle = async (data: LoginGoogleDto) => {
    const { email, ...createData } = data;
    let user: UserService["data"] | null = null;
    try {
      const service = await UserService.getByEmail(email);
      user = service.data;
    } catch {
      user = await db.transaction(async () => {
        const service = await UserService.createWithoutPassword(email);
        const user = service.data;

        await ProfileService.create(
          {
            ...createData,
            about: null,
            dob: null,
            gender: null,
            username: null,
          },
          user.id
        );
        return user;
      });
    } finally {
      if (!user) throw AuthErrors.unauthorized;

      return LoginUtils.createPayload(user);
    }
  };
}

class LoginUtils {
  static createPayload = async (user: UserService["data"]) => {
    const authPayload: AuthPayloadType = { id: user.id };
    const authToken = await TokenService.issueToken(authPayload);

    let profile: ProfileService["data"] | null = null;
    try {
      const service = await ProfileService.getById(user.id);
      profile = service.data;
    } catch {}

    return { authToken, user: profile };
  };
}
