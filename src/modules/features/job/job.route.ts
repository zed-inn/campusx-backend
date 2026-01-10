import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { JobGetPageSchema } from "./dtos/job-get.dto";
import { JobSchema } from "./dtos/job-response.dto";
import { array } from "zod";
import { JobController } from "./job.controller";

const router = new DetailedRouter("Jobs");

router
  .describe("Get jobs", "Get jobs by page")
  .userProfiled()
  .query(JobGetPageSchema)
  .output("jobs", array(JobSchema), "Jobs.")
  .get("/", JobController.getJobsByPage);

export const JobRouter = router;
