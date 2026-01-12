import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { JobGetFilterSchema } from "./dtos/job-get.admin.dto";
import { array } from "zod";
import { JobSchema } from "./dtos/job-response.admin.dto";
import { JobController } from "./job.admin.controller";
import {
  JobCreateSchema,
  JobDeleteSchema,
  JobUpdateSchema,
} from "./dtos/job-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Admin Job");

router
  .describe("Get jobs", "Get jobs by filter")
  .admin()
  .query(JobGetFilterSchema)
  .output("jobs", array(JobSchema), "Jobs fetched.")
  .get("/", JobController.getJobsByFilters);

router
  .describe("Create job", "Create job")
  .admin()
  .body(JobCreateSchema)
  .output("job", JobSchema, "Job created.")
  .post("/", JobController.createJob);

router
  .describe("Update job", "Update job by Id")
  .admin()
  .body(JobUpdateSchema)
  .output("job", JobSchema, "Job updated.")
  .patch("/", JobController.updateJob);

router
  .describe("Delete job", "Delete job by Id")
  .admin()
  .query(JobDeleteSchema)
  .output(GlobalDeleteSchema, "Job deleted.")
  .delete("/", JobController.deleteJob);

export const JobAdminRouter = router;
