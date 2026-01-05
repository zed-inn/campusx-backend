import { CategoryRouter } from "./category/category.route";
import { PostRouter } from "./post/post.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Insights");

router.use("/category", CategoryRouter);

router.use("/post", PostRouter);

export const InsightsRouter = router;
