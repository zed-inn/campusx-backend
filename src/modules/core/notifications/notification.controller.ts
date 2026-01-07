import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { NotificationGetPageDto } from "./dtos/notification-get.dto";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { NotificationService } from "./notification.service";
import { ApiResponse } from "@shared/utils/api-response";
import { NotificationSchema } from "./dtos/notification-response.dto";

export class NotificationController {
  static getMyNotification = catchAsync(
    async (req: Request<{}, {}, {}, NotificationGetPageDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iNotifications = await NotificationService.getByUserId(
        user.id,
        q.page
      );
      const pNotifications = iNotifications.map((n) =>
        NotificationSchema.parse(n)
      );

      return ApiResponse.success(res, "Notfications.", {
        notifications: pNotifications,
      });
    }
  );
}
