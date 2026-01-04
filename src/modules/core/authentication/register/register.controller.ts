import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { RegisterBasicDto, RegisterGoogleDto } from "./dtos/register.dto";
import { RegisterService } from "./register.service";
import { AuthResponseSchema } from "../dtos/auth-response.dto";

export class RegisterController {
  static registerBasic = catchAsync(
    async (req: Request<{}, {}, RegisterBasicDto>, res: Response) => {
      const authData = await RegisterService.createBasic(req.body);

      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Registration successfull.", authPayload);
    }
  );

  static registerGoogle = catchAsync(
    async (req: Request<{}, {}, RegisterGoogleDto>, res: Response) => {
      const authData = await RegisterService.createGoogle(req.body);

      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Registration successfull.", authPayload);
    }
  );
}
