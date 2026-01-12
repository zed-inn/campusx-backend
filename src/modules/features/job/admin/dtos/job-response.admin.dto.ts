import { z } from "zod";
import { JobModel } from "../../job.model";

export const JobSchema = JobModel.dbSchema;

export type JobDto = z.infer<typeof JobSchema>;
