import { Router } from "express";
import { AuthRouter } from "@modules/core/authentication/auth.routes";
import { ProfileRouter } from "@modules/core/profile";
import { ForumRouter } from "@modules/features/forums";
import { InsightsRouter } from "@modules/features/insights/insights.route";
import { InstituteRouter } from "@modules/core/institutes";
import { InstituteReviewRouter } from "@modules/features/institute-review";

const router = Router();

router.use("/", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/forums", ForumRouter);
router.use("/insights", InsightsRouter);
router.use("/institute", InstituteRouter);
router.use("/institute/review", InstituteReviewRouter);

export const AppRouter = router;
