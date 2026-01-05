import { ReportCreateSchema } from "./dtos/report-create.dto";
import { ReportController } from "./report.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("User Report");

router
  .describe("Report User", "Reports a user")
  .auth()
  .body(ReportCreateSchema)
  .output("Reported.")
  .post("/", ReportController.reportUser);

export const ReportRouter = router;
