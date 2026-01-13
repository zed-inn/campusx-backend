import { JOBS_PER_PAGE } from "@config/constants/items-per-page";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Job, JobAttributes, JobInstance } from "../job.model";
import {
  JobCreateDto,
  JobCreateManyDto,
  JobUpdateDto,
} from "./dtos/job-action.admin.dto";
import { JobFiltersDto } from "./dtos/job-get.admin.dto";
import { OrderItem } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _JobService extends BaseService<JobInstance> {
  protected OFFSET = createOffsetFn(JOBS_PER_PAGE);

  constructor() {
    super(Job);
  }

  createNew = async (data: JobCreateDto) => {
    return await this.create(data);
  };

  createBulk = async (data: JobCreateDto[]) => {
    const jobs = await Job.bulkCreate(data);
    return jobs.map((j) => j.plain);
  };

  getByFilters = async (
    filters: JobFiltersDto,
    order: string[][],
    page: number
  ) => {
    const jobs = await Job.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: JOBS_PER_PAGE,
      order: order as OrderItem[],
    });

    return jobs.map((j) => j.plain);
  };

  update = async (data: JobUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const job = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await job.update(cleanData as Partial<JobAttributes>);

      return job;
    });
  };
}

export const JobService = new _JobService();
