import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { PostRouter } from "./post/post.admin.route";
import { CategoryRouter } from "./category/category.admin.route";

const router = new DetailedRouter("Insights");

router.use("/post", PostRouter);

router.use("/category", CategoryRouter);

export const InsightsAdminRouter = router;
