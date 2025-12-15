import { z } from "zod";
import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { TokenService } from "@shared/services/token.service";
import { LoginService } from "./services/login.service";
import { SignupService } from "./services/signup.service";
import { LoginBasicDto } from "./dtos/login-basic.dto";
import { SignupInitDto } from "./dtos/signup-init.dto";
import { SignupVerifyDto } from "./dtos/signup-verify.dto";
import { SignupFinalDto } from "./dtos/signup-final.dto";
import { AuthResponseSchema } from "./dtos/auth-response.dto";

export class AuthController {
  static loginWithPassword = catchAsync(
    async (req: Request<{}, {}, LoginBasicDto>, res: Response) => {
      const authData = await LoginService.loginBasic(req.body);
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Logged in.", { ...authPayload });
    }
  );

  static getOtp = catchAsync(
    async (req: Request<{}, {}, SignupInitDto>, res: Response) => {
      SignupService.sendOtp(req.body.email);

      return ApiResponse.success(res, "Otp sent.");
    }
  );

  static verifyOtp = catchAsync(
    async (req: Request<{}, {}, SignupVerifyDto>, res: Response) => {
      const { email, otp } = req.body;

      const otpToken = await SignupService.verifyOtp(email, otp);

      return ApiResponse.success(res, "Otp verified.", { otpToken });
    }
  );

  static createPassword = catchAsync(
    async (req: Request<{}, {}, SignupFinalDto>, res: Response) => {
      const { otpToken, password } = req.body;

      const authData = await SignupService.createPassword(otpToken, password);
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Signed up.", { ...authPayload });
    }
  );

  static logout = catchAsync(async (req: Request, res: Response) => {
    const authToken = z.string().parse(req.authToken);

    await TokenService.revokeToken(authToken);

    return ApiResponse.success(res, "Logged out succesfully");
  });
}
