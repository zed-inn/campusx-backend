import { UserAttributes } from "@modules/core/user";
import { AuthPayloadType } from "@shared/dtos/auth.dto";
import { TokenService } from "@shared/services/token.service";
import { ProfileService } from "@modules/core/profile";

export class AuthService {
  static createAuthResponse = async (user: UserAttributes) => {
    const authPayload: AuthPayloadType = { id: user.id, role: user.role };
    const authToken = await TokenService.issueToken(authPayload);

    let profile: any = null;
    try {
      profile = (await ProfileService.getById(user.id)).plain;
    } catch {}

    return { authToken, user: profile };
  };
}
