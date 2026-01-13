import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ReportGetFilterDto } from "./dtos/report-get.admin.dto";
import { ReportService } from "./report.admin.service";
import { ReportAggregator } from "./report.admin.aggregator";
import { ReportSchema } from "./dtos/report-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  ReportDeleteDto,
  ReportUpdateDto,
} from "./dtos/report-action.admin.dto";
import { converTOrder } from "@shared/utils/convert-to-order";

export class ReportController {
  static getReportsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, ReportGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order: converTOrder(order), filters };

      const iReports = await ReportService.getByFilters(
        q.filters,
        q.order,
        q.page
      );
      const tReports = await ReportAggregator.transform(iReports);
      const pReports = tReports.map((r) => ReportSchema.parse(r));

      return ApiResponse.success(res, "Reports fetched.", {
        reports: pReports,
      });
    }
  );

  static updateReport = catchAsync(
    async (req: Request<{}, {}, ReportUpdateDto>, res: Response) => {
      const iReport = await ReportService.update(req.body);
      const [tReport] = await ReportAggregator.transform([iReport.plain]);
      const pReport = ReportSchema.parse(tReport);

      return ApiResponse.success(res, "Report updated.", { report: pReport });
    }
  );

  static deleteReport = catchAsync(
    async (req: Request<{}, {}, {}, ReportDeleteDto>, res: Response) => {
      const q = req.query;

      const report = await ReportService.deleteById(q.id);

      return ApiResponse.success(res, "Report deleted.", { id: report.id });
    }
  );
}
