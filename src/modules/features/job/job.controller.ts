import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { JobGetPageDto } from "./dtos/job-get.dto";
import { JobService } from "./job.service";
import { ApiResponse } from "@shared/utils/api-response";

export class JobController {
  static getJobsByPage = catchAsync(
    async (req: Request<{}, {}, {}, JobGetPageDto>, res: Response) => {
      const q = req.query;

      const jobs = await JobService.getByPage(q.page);

      return ApiResponse.success(res, "Jobs", { jobs });
    }
  );
}
