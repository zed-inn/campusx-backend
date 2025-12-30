import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { TokenService } from "@shared/services/token.service";
import { LoginService } from "./services/login.service";
import { SignupService } from "./services/signup.service";
import { LoginBasicDto } from "./dtos/service/login-basic.dto";
import { SignupDto } from "./dtos/service/signup-final.dto";
import { AuthResponseSchema } from "./dtos/controller/auth-response.dto";
import { LoginGoogleDto } from "./dtos/service/login-google.dto";
import { OtpService } from "./services/otp.service";
import { s } from "@shared/utils/create-schema";
import { UserService } from "../user";

export class AuthController {
  static loginWithPassword = catchAsync(
    async (req: Request<{}, {}, LoginBasicDto>, res: Response) => {
      const authData = await LoginService.loginBasic(req.body);
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Logged in.", authPayload);
    }
  );

  static loginWithGoogle = catchAsync(
    async (req: Request<{}, {}, LoginGoogleDto>, res: Response) => {
      const authData = await LoginService.loginGoogle(req.body);
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Logged in.", authPayload);
    }
  );

  static getOtp = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ email: s.fields.email }).parse(req.body);
    OtpService.sendOtp(q.email);

    return ApiResponse.success(res, "Otp sent.");
  });

  static verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const q = s
      .create({ email: s.fields.email, otp: s.fields.string })
      .parse(req.body);
    const otpToken = await OtpService.verifyOtp(q.email, q.otp);

    return ApiResponse.success(res, "Otp verified.", { otpToken });
  });

  static createPassword = catchAsync(
    async (req: Request<{}, {}, SignupDto>, res: Response) => {
      const q = req.body;
      const authData = await SignupService.createPassword(
        q.otpToken,
        q.password
      );
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Signed up.", authPayload);
    }
  );

  static resetPassword = catchAsync(
    async (req: Request<{}, {}, SignupDto>, res: Response) => {
      const q = req.body;
      const email = await OtpService.getEmailFromOtpToken(q.otpToken);
      await UserService.updatePasswordByEmail({ email, password: q.password });

      return ApiResponse.success(res, "Password resetted.");
    }
  );

  static logout = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ authToken: s.fields.string }).parse(req);
    await TokenService.revokeToken(q.authToken);

    return ApiResponse.success(res, "Logged out.");
  });
}
