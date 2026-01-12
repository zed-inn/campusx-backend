import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReportGetFilterSchema } from "./dtos/report-get.admin.dto";
import { array } from "zod";
import { ReportSchema } from "./dtos/report-response.admin.dto";
import { ReportController } from "./report.admin.controller";
import {
  ReportDeleteSchema,
  ReportUpdateSchema,
} from "./dtos/report-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Report");

router
  .describe("Get reports", "Get reports by filter")
  .admin()
  .query(ReportGetFilterSchema)
  .output("reports", array(ReportSchema), "Reports fetched.")
  .get("/", ReportController.getReportsByFilters);

router
  .describe("Update report", "Update report by Id")
  .admin()
  .body(ReportUpdateSchema)
  .output("report", ReportSchema, "Report updated.")
  .patch("/", ReportController.updateReport);

router
  .describe("Delete report", "Delete report by Id")
  .admin()
  .query(ReportDeleteSchema)
  .output(GlobalDeleteSchema, "Report deleted.")
  .delete("/", ReportController.deleteReport);

export const ReportRouter = router;
