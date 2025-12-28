import { AuthRouter } from "@modules/core/authentication";
import { InstituteRouter } from "@modules/core/institutes";
import { ProfileRouter } from "@modules/core/profile";
import { ProfileEducationRouter } from "@modules/features/education";
import { FeedbackRouter } from "@modules/features/feedback";
import { ForumRouter } from "@modules/features/forums";
import { InsightsRouter } from "@modules/features/insights";
import { InstituteDiscussionRouter } from "@modules/features/institute-discussion";
import { InstituteReviewRouter } from "@modules/features/institute-review";
import { Router } from "express";
import { DocsRouter } from "./docs/readme.route";
import { AmbassadorRouter } from "@modules/features/ambassador";

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
  DocsRouter,
  AmbassadorRouter,
];

for (const ModuleRouter of routers) router.use("/", ModuleRouter);

export const AppRouter = router;
