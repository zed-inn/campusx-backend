import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Parse } from "@shared/utils/parse-fields";
import { Request, Response } from "express";
import { z } from "zod";
import { ReportService } from "../services/report.service";
import { ReportResponseSchema } from "../dtos/report-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class ReportController {
  static reportForum = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const id = Parse.id(req.body.forumId);
    const reason = z.string("Invalid Reason").parse(req.body.reason);

    const report = await ReportService.report(id, reason, user.id);
    const parsedReport = ReportResponseSchema.parse(report);

    return ApiResponse.success(res, "Reported.", { report: parsedReport });
  });
}
