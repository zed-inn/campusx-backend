import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { LoginBasicDto, LoginGoogleDto } from "./dtos/login.dto";
import { LoginService } from "./login.service";
import { AppError } from "@shared/errors/app-error";
import { AuthResponseSchema } from "../dtos/auth-response.dto";

export class LoginController {
  static loginWithPassword = catchAsync(
    async (req: Request<{}, {}, LoginBasicDto>, res: Response) => {
      const q = req.body;

      if (!q.username && !q.email) throw new AppError("Invalid Request", 400);

      const authData = q.email
        ? await LoginService.loginBasicWithEmail(q.email, q.password)
        : await LoginService.loginBasicWithUsername(
            q.username ?? "",
            q.password
          );
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
