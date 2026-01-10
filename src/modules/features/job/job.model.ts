import db from "@config/database";
import { PRIMARY_ID } from "@shared/utils/db-types";
import { defineModel } from "@shared/utils/define-model";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const JobModel = modelSchema({
  id: z.uuidv4("Invalid Job Id"),
});

export type JobAttributes = z.infer<typeof JobModel.dbSchema>;
export type JobCreationAttributes = Omit<
  z.infer<typeof JobModel.dbFields>,
  "id"
>;

export const Job = defineModel<JobAttributes, JobCreationAttributes>(
  db,
  "Job",
  {
    id: { ...PRIMARY_ID },
  }
);

export type JobInstance = InstanceType<typeof Job>;
