import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { RecoverPasswordDto } from "./dtos/recovery.dto";
import { RecoveryService } from "./recovery.service";

export class RecoveryController {
  static resetPasswordBasic = catchAsync(
    async (req: Request<{}, {}, RecoverPasswordDto>, res: Response) => {
      await RecoveryService.resetPasswordBasic(req.body);

      return ApiResponse.success(res, "Password resetted.");
    }
  );
}
