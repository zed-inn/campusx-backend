import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { NotificationGetPageSchema } from "./dtos/notification-get.dto";
import { NotificationSchema } from "./dtos/notification-response.dto";
import { NotificationController } from "./notification.controller";
import { array } from "zod";

const router = new DetailedRouter("Notification");

router
  .describe(
    "Get notifications",
    "Get notifications of a user.\nType allowed: `LIKE`, `COMMENT`, `MESSAGE`"
  )
  .userProfiled()
  .query(NotificationGetPageSchema)
  .output("notitifications", array(NotificationSchema), "Notifications.")
  .get("/", NotificationController.getMyNotification);

export const NotificationRouter = router;
