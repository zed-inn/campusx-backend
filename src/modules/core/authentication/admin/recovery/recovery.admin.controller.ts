import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { RecoveryBasicDto } from "./dtos/recovery-action.admin.dto";
import { RecoveryService } from "./recovery.admin.service";
import { ApiResponse } from "@shared/utils/api-response";

export class RecoveryController {
  static resetPassword = catchAsync(
    async (req: Request<{}, {}, RecoveryBasicDto>, res: Response) => {
      await RecoveryService.basic(req.body);

      return ApiResponse.success(res, "Password resetted.");
    }
  );
}
