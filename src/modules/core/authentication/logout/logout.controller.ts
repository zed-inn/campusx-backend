import { AppError } from "@shared/errors/app-error";
import { TokenService } from "@shared/services/token.service";
import { ApiResponse } from "@shared/utils/api-response";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";

export class LogoutController {
  static logout = catchAsync(async (req: Request, res: Response) => {
    const authToken = req.authToken;
    if (!authToken) throw new AppError("Invalid Request", 406);

    await TokenService.revokeToken(authToken);

    return ApiResponse.success(res, "Logged out.");
  });
}
