import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ReportCreateDto } from "./dtos/report-create.dto";
import { ReportService } from "./report.service";
import { ApiResponse } from "@shared/utils/api-response";

export class ReportController {
  static reportUser = catchAsync(
    async (req: Request<{}, {}, ReportCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      await ReportService.createNew(req.body, user.id);

      return ApiResponse.success(res, "Reported.");
    }
  );
}
