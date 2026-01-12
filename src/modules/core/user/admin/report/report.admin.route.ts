import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReportGetFilterSchema } from "./dtos/report-get.admin.dto";
import { array } from "zod";
import { ReportSchema } from "./dtos/report-response.admin.dto";
import { ReportController } from "./report.admin.controller";

const router = new DetailedRouter("Report");

router
  .describe("Get reports", "Get reports by filters")
  .admin()
  .query(ReportGetFilterSchema)
  .output("reports", array(ReportSchema), "Reports fetched.")
  .get("/", ReportController.getReportsByFilters);

export const ReportRouter = router;
