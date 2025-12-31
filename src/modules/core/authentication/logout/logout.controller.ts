import { TokenService } from "@shared/services/token.service";
import { ApiResponse } from "@shared/utils/api-response";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";

export class LogoutController {
  static logout = catchAsync(async (req: Request, res: Response) => {
    const q = s.create({ authToken: s.fields.string }).parse(req);
    await TokenService.revokeToken(q.authToken);

    return ApiResponse.success(res, "Logged out.");
  });
}
