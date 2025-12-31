import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { OtpService } from "./otp.service";
import { ApiResponse } from "@shared/utils/api-response";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";

export class OtpController {
  static getOtp = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ email: s.fields.email }).parse(req.body);
    OtpService.sendOtp(q.email);

    return ApiResponse.success(res, "Otp sent.");
  });

  static verifyOtp = catchAsync(
    async (req: Request<{}, {}, VerifyOtpDto>, res: Response) => {
      const otpToken = await OtpService.verifyOtp(req.body);

      return ApiResponse.success(res, "Otp verified.", { otpToken });
    }
  );
}
