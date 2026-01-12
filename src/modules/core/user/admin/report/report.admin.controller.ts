import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ReportGetFilterDto } from "./dtos/report-get.admin.dto";
import { ReportService } from "./report.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import { ReportAggregator } from "./report.admin.aggregator";
import { ReportSchema } from "./dtos/report-response.admin.dto";

export class ReportController {
  static getReportsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, ReportGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iReports = await ReportService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tReports = await ReportAggregator.transform(iReports);
      const pReports = tReports.map((r) => ReportSchema.meta(r));

      return ApiResponse.success(res, "Reports fetched.", {
        reports: pReports,
      });
    }
  );
}
