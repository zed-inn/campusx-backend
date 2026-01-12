import { AuthAdminRouter } from "@modules/core/authentication/admin";
import { DetailedRouter } from "./infra/http/detailed-router";
import { InstituteAdminRouter } from "@modules/core/institutes/admin";
import { InsightsAdminRouter } from "@modules/features/insights/admin";
import { UserAdminRouter } from "@modules/core/user/admin/";

const router = new DetailedRouter("Admin");

const routers: Record<string, DetailedRouter> = {
  "/auth": AuthAdminRouter,
  "/institute": InstituteAdminRouter,
  "/insight": InsightsAdminRouter,
  "/user": UserAdminRouter,
};

for (const key of Object.keys(routers)) {
  if (routers[key]) router.use(key, routers[key]);
}

export const AdminAppRouter = router;
