import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ReportRouter } from "./report/report.admin.route";
import { ProfileAdminRouter } from "@modules/core/profile/admin";

const router = new DetailedRouter("Admin User");

router.use("/", ProfileAdminRouter);

router.use("/report", ReportRouter);

export const UserAdminRouter = router;
