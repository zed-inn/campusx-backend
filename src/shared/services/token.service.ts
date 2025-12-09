import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { env } from "@config/env";
import client from "@config/cache";
import { AuthPayloadType } from "@shared/dtos/auth.dto";

export class TokenService {
  static JWT_ID_AGE_DAYS = 7;

  static issueToken = async (user: AuthPayloadType): Promise<string> => {
    const jti = uuidv4();
    const token = jwt.sign({ user, jti }, env.JWT_SECRET, {
      expiresIn: "15Y",
    });
    await client.setEx(
      `auth:${user.id}:${jti}`,
      this.JWT_ID_AGE_DAYS * 24 * 60 * 60,
      "1"
    );

    return token;
  };

  static verifyToken = async (token: string): Promise<AuthPayloadType> => {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      user: AuthPayloadType;
      jti: string;
    };
    const key = `auth:${decoded.user.id}:${decoded.jti}`;

    const isActive = await client.get(key);
    if (!isActive) throw new Error("Session Expired");

    await client.expire(key, this.JWT_ID_AGE_DAYS * 24 * 60 * 60);

    return decoded.user;
  };

  static revokeToken = async (token: string) => {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      user: AuthPayloadType;
      jti: string;
    };
    const key = `auth:${decoded.user.id}:${decoded.jti}`;

    await client.del(key);
  };
}
