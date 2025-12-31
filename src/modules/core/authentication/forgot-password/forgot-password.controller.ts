import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { CreatePasswordDto } from "../signup/dtos/create-password.dto";
import { OtpService } from "../otp/otp.service";
import { UserService } from "@modules/core/user";
import { ApiResponse } from "@shared/utils/api-response";

export class ForgotPasswordController {
  static resetPassword = catchAsync(
    async (req: Request<{}, {}, CreatePasswordDto>, res: Response) => {
      const q = req.body;
      const email = await OtpService.getEmailFromOtpToken(q.otpToken);
      await UserService.updatePasswordByEmail({ email, password: q.password });

      return ApiResponse.success(res, "Password resetted.");
    }
  );
}
