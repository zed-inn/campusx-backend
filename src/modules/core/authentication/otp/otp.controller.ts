import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { OtpService } from "./otp.service";
import { ApiResponse } from "@shared/utils/api-response";
import { OtpGetDto } from "./dtos/otp-get.dto";
import { OtpVerifyDto } from "./dtos/otp-verify.dto";

export class OtpController {
  static getOtp = catchAsync(
    async (req: Request<{}, {}, OtpGetDto>, res: Response) => {
      const q = req.body;

      OtpService.sendOtp(q.email);

      return ApiResponse.success(res, "Otp sent.");
    }
  );

  static verifyOtp = catchAsync(
    async (req: Request<{}, {}, OtpVerifyDto>, res: Response) => {
      const otpToken = await OtpService.verifyOtp(req.body);

      return ApiResponse.success(res, "Otp verified.", { otpToken });
    }
  );
}
