import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { NotificationCreateDto } from "./dtos/notification-action.admin.dto";
import { NotificationService } from "./notification.admin.service";
import { ApiResponse } from "@shared/utils/api-response";

export class NotificationController {
  static sendNotifications = catchAsync(
    async (req: Request<{}, {}, NotificationCreateDto>, res: Response) => {
      await NotificationService.save(req.body);

      return ApiResponse.success(res, "Notification sent.");
    }
  );
}
