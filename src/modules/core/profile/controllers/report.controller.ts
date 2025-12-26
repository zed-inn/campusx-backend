import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { createSchema } from "@shared/utils/create-schema";
import { Request, Response } from "express";
import { ReportService } from "../services/report.service";
import { ApiResponse } from "@shared/utils/api-response";

export class ReportController {
  static reportUser = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);
    const q = createSchema({ id: "id", reason: "string" }).parse(req.body);

    await ReportService.create(q.id, q.reason, user.id);

    return ApiResponse.success(res, "Reported.");
  });
}
