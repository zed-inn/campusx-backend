import { z } from "zod";
import { JobModel } from "../../job.model";

export const JobCreateSchema = JobModel.dbFields.omit({
  id: true,
  slug: true,
});

export type JobCreateDto = z.infer<typeof JobCreateSchema>;

export const JobUpdateSchema = JobModel.dbFields
  .omit({ id: true, slug: true })
  .partial()
  .extend({ id: JobModel.fields.id });

export type JobUpdateDto = z.infer<typeof JobUpdateSchema>;

export const JobDeleteSchema = JobModel.dbSchema.pick({ id: true });

export type JobDeleteDto = z.infer<typeof JobDeleteSchema>;
