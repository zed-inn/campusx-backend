import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { CreatePasswordDto } from "./dtos/create-password.dto";
import { SignupService } from "./signup.service";
import { AuthResponseSchema } from "../dtos/auth-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class SignupController {
  static createPassword = catchAsync(
    async (req: Request<{}, {}, CreatePasswordDto>, res: Response) => {
      const authData = await SignupService.createPassword(req.body);
      const authPayload = AuthResponseSchema.parse(authData);

      return ApiResponse.success(res, "Signed up.", authPayload);
    }
  );
}
