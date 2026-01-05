import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReportCreateSchema } from "./dtos/report-create.dto";
import { ReportController } from "./report.controller";

const router = new DetailedRouter("Forum Report");

router
  .describe(
    "Report Post",
    "Flags a forum post for administrative review due to content violations."
  )
  .userProfiled()
  .body(ReportCreateSchema)
  .output("Reported.")
  .post("/", ReportController.reportPost);

export const ReportRouter = router;
