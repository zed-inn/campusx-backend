import { BaseService } from "@shared/services/base.service";
import { Job, JobInstance } from "./job.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { JOBS_PER_PAGE } from "@config/constants/items-per-page";

class _JobService extends BaseService<JobInstance> {
  protected OFFSET = createOffsetFn(JOBS_PER_PAGE);

  constructor() {
    super(Job);
  }

  getByPage = async (page: number) => {
    const jobs = await Job.findAll({
      offset: this.OFFSET(page),
      limit: JOBS_PER_PAGE,
    });

    return jobs.map((j) => j.plain);
  };
}

export const JobService = new _JobService();
