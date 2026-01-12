import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { JobGetFilterDto } from "./dtos/job-get.admin.dto";
import { JobService } from "./job.admin.service";
import { JobSchema } from "./dtos/job-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";
import {
  JobCreateDto,
  JobDeleteDto,
  JobUpdateDto,
} from "./dtos/job-action.admin.dto";

export class JobController {
  static getJobsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, JobGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iJobs = await JobService.getByFilters(q.filters, q.order, q.page);
      const pJobs = iJobs.map((j) => JobSchema.parse(j));

      return ApiResponse.success(res, "Jobs fetched.", { jobs: pJobs });
    }
  );

  static createJob = catchAsync(
    async (req: Request<{}, {}, JobCreateDto>, res: Response) => {
      const iJob = await JobService.createNew(req.body);
      const pJob = JobSchema.parse(iJob.plain);

      return ApiResponse.success(res, "Job created.", { job: pJob });
    }
  );

  static updateJob = catchAsync(
    async (req: Request<{}, {}, JobUpdateDto>, res: Response) => {
      const iJob = await JobService.update(req.body);
      const pJob = JobSchema.parse(iJob.plain);

      return ApiResponse.success(res, "Job updated.", { job: pJob });
    }
  );

  static deleteJob = catchAsync(
    async (req: Request<{}, {}, {}, JobDeleteDto>, res: Response) => {
      const q = req.query;

      const job = await JobService.deleteById(q.id);

      return ApiResponse.success(res, "Job deleted.", { id: job.id });
    }
  );
}
