import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { LoginPasswordDto } from "./dtos/login-password.dto";
import { LoginService } from "./services/login.service";
import { ApiResponse } from "@shared/utils/response";
import { SignupInitDto } from "./dtos/signup-init.dto";
import { SignupService } from "./services/signup.service";
import { SignupVerifyDto } from "./dtos/signup-verify.dto";
import { SignupFinalDto } from "./dtos/signup-final.dto";
import { TokenService } from "@shared/services/token.service";
import { AppError } from "@shared/errors/app-error";

export class AuthController {
  static loginWithPassword = catchAsync(
    async (req: Request<{}, {}, LoginPasswordDto>, res: Response) => {
      const dataToSend = await LoginService.loginWithPassword(req.body);
      return ApiResponse.success(res, "Login successfull", { ...dataToSend });
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
      const otpToken = await SignupService.verifyOtp(req.body);
      return ApiResponse.success(res, "Otp verified.", { otpToken });
    }
  );

  static createPassword = catchAsync(
    async (req: Request<{}, {}, SignupFinalDto>, res: Response) => {
      const dataToSend = await SignupService.createPassword(req.body);
      return ApiResponse.success(res, "User created succesfully.", {
        ...dataToSend,
      });
    }
  );

  static logout = catchAsync(async (req: Request, res: Response) => {
    const authToken = req.authToken;
    if (!authToken) throw new AppError("Invalid request.", 401);

    await TokenService.revokeToken(authToken);
    return ApiResponse.success(res, "Logged out succesfully");
  });
}
