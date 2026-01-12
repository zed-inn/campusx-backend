import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { NotificationCreateSchema } from "./dtos/notification-action.admin.dto";
import { NotificationController } from "./notification.admin.controller";

const router = new DetailedRouter("Notification");

router
  .describe("Push notification", "Send notification to some/all users")
  .admin()
  .body(NotificationCreateSchema)
  .output("Notifications sent.")
  .post("/", NotificationController.sendNotifications);

export const NotificatioAdminRouter = router;
