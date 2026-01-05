import { ReportRouter } from "./report/report.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("User");

router.use("/report", ReportRouter);

// TODO: delete account endpoint and how to do it

export const UserRouter = router;
