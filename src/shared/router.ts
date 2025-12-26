import { Router } from "express";
import { AuthRouter } from "@modules/core/authentication/auth.routes";
import { ProfileRouter } from "@modules/core/profile";
import { ForumRouter } from "@modules/features/forums";
import { InsightsRouter } from "@modules/features/insights/insights.route";
import { InstituteRouter } from "@modules/core/institutes";
import { InstituteReviewRouter } from "@modules/features/institute-review";
import { InstituteDiscussionRouter } from "@modules/features/institute-discussion";
import { FeedbackRouter } from "@modules/features/feedback";
import { ProfileEducationRouter } from "@modules/features/education";

const router = Router();

const routers = [
  AuthRouter,
  ProfileRouter,
  ForumRouter,
  InsightsRouter,
  InstituteRouter,
  InstituteReviewRouter,
  InstituteDiscussionRouter,
  FeedbackRouter,
  ProfileEducationRouter,
];

for (const ModuleRouter of routers) router.use("/", ModuleRouter);

export const AppRouter = router;
