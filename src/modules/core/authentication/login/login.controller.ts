import { catchAsync } from "@shared/utils/catch-async";
import { AuthResponseSchema } from "../dtos/auth-response.dto";
import { LoginService } from "./login.service";
import { LoginBasicDto } from "./dtos/login-basic.dto";
import { LoginGoogleDto } from "./dtos/login-google.dto";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";

export class LoginController {
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
}
