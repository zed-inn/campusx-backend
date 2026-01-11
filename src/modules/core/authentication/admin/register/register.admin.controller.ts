import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { RegisterCreateBasicDto } from "./dtos/register-action.admin.dto";
import { RegisterService } from "./register.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthResponseSchema } from "@modules/core/authentication/dtos/auth-response.dto";

export class RegisterController {
  static registerBasic = catchAsync(
    async (req: Request<{}, {}, RegisterCreateBasicDto>, res: Response) => {
      const iAuthPayload = await RegisterService.basic(req.body);
      const pAuthPayload = AuthResponseSchema.parse(iAuthPayload);

      return ApiResponse.success(res, "Registered as Admin.", pAuthPayload);
    }
  );
}
