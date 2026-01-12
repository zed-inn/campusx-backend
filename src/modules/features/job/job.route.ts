import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { JobGetPageSchema } from "./dtos/job-get.dto";
import { JobSchema } from "./dtos/job-response.dto";
import { array } from "zod";
import { JobController } from "./job.controller";

const router = new DetailedRouter("Jobs");

router
  .describe(
    "Get jobs",
    "Get jobs by page | \nTypes: `FULL_TIME`, `PART_TIME`, `INTERNSHIP`, `FREELANCE`, `CONTRACT`, `GOVT`, `WALK_IN` | \nStatus: `DRAFT`, `ACTIVE`, `CLOSED`, `EXPIRED` | \nSalary Periods: `HOURLY`, `MONTHLY`, `YEARLY`, `ONE_TIME`"
  )
  .userProfiled()
  .query(JobGetPageSchema)
  .output("jobs", array(JobSchema), "Jobs.")
  .get("/", JobController.getJobsByPage);

export const JobRouter = router;
