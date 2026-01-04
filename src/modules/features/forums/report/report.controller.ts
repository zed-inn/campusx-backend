import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { ReportService } from "./report.service";
import { ReportCreateDto } from "./dtos/report-create.dto";

export class ReportController {
  static reportPost = catchAsync(
    async (req: Request<{}, {}, ReportCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.body;

      await ReportService.create({
        postId: q.forumId,
        reason: q.reason,
        userId: user.id,
      });

      return ApiResponse.success(res, "Reported.");
    }
  );
}
