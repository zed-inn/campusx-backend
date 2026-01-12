import { AuthAdminRouter } from "@modules/core/authentication/admin";
import { DetailedRouter } from "./infra/http/detailed-router";
import { InstituteAdminRouter } from "@modules/core/institutes/admin";
import { InsightsAdminRouter } from "@modules/features/insights/admin";
import { UserAdminRouter } from "@modules/core/user/admin/";
import { NotificatioAdminRouter } from "@modules/core/notifications/admin";
import { CompetitionAdminRouter } from "@modules/features/competition/admin";
import { ForumAdminRouter } from "@modules/features/forums/admin";
import { FeedbackAdminRouter } from "@modules/features/feedback/admin";

const router = new DetailedRouter("Admin");

const routers: Record<string, DetailedRouter> = {
  "/auth": AuthAdminRouter,
  "/institute": InstituteAdminRouter,
  "/insight": InsightsAdminRouter,
  "/user": UserAdminRouter,
  "/notification": NotificatioAdminRouter,
  "/competition": CompetitionAdminRouter,
  "/forums": ForumAdminRouter,
  "/feedback": FeedbackAdminRouter,
};

for (const key of Object.keys(routers)) {
  if (routers[key]) router.use(key, routers[key]);
}

export const AdminAppRouter = router;
