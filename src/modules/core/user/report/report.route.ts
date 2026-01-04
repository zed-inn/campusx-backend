import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { ReportCreateSchema } from "./dtos/report-create.dto";
import { ReportController } from "./report.controller";

const router = Router();

router.post(
  "/",
  RestrictTo.loggedInUser,
  ValidateReq.body(ReportCreateSchema),
  ReportController.reportUser
);

export const ReportRouter = router;
