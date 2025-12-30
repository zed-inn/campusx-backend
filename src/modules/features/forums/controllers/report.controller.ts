import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { s } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { ApiResponse } from "@shared/utils/api-response";

export class ReportController {
  static reportForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = s
      .create({ id: s.fields.id, reason: s.fields.string })
      .parse(req.body);

    await ReportService.create(q.id, q.reason, user.id);

    return ApiResponse.success(res, "Reported.");
  });
}
