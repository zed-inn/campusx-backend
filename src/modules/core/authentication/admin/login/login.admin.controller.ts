import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { LoginBasicDto } from "./dtos/login-action.admin.dto";
import { LoginService } from "./login.admin.service";
import { AuthResponseSchema } from "@modules/core/authentication/dtos/auth-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class LoginController {
  static loginBasic = catchAsync(
    async (req: Request<{}, {}, LoginBasicDto>, res: Response) => {
      const iAuthPayload = await LoginService.basic(req.body);
      const pAuthPayload = AuthResponseSchema.parse(iAuthPayload);

      return ApiResponse.success(res, "Logged in.", pAuthPayload);
    }
  );
}
