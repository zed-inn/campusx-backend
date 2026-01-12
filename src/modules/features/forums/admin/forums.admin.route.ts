import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { PostRouter } from "./post/post.admin.route";
import { ReportRouter } from "./report/report.admin.route";

const router = new DetailedRouter("Admin Forums");

router.use("/post", PostRouter);

router.use("/report", ReportRouter);

export const ForumAdminRouter = router;
