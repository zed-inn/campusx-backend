import { Request, Response } from "express";
import { LogGetPageDto } from "./dtos/log-get.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { LogService } from "./log.service";
import { LogSchema } from "./dtos/log-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class LogController {
  static getLogs = catchAsync(
    async (req: Request<{}, {}, {}, LogGetPageDto>, res: Response) => {
      const q = req.query;

      const iLogs = await LogService.getByPage(q.page);
      const pLogs = iLogs.map((l) => LogSchema.parse(l));

      return ApiResponse.success(res, "Logs.", { logs: pLogs });
    },
  );
}
