import { UserService } from "@modules/core/user";
import { Notification, NotificationInstance } from "./notification.model";
import { BaseService } from "@shared/services/base.service";
import { NotificationCreateDto } from "./dtos/notification-action.dto";
import { NotifyService } from "@shared/services/notify.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { NOTIFICATIONS_PER_PAGE } from "@config/constants/items-per-page";
import { NOTIFICATION_TYPE } from "@config/constants/notification-types";

class _NotificationService extends BaseService<NotificationInstance> {
  protected OFFSET = createOffsetFn(NOTIFICATIONS_PER_PAGE);
  private volatileTypes = [NOTIFICATION_TYPE.MESSAGE];

  constructor() {
    super(Notification);
  }

  createNew = async (data: NotificationCreateDto, userId: string) => {
    const user = await UserService.getById(userId);
    const userData = user.plain;
    const fcmToken = userData.fcmToken;

    if (!this.volatileTypes.includes(data.type as any))
      await this.create({ ...data, userId });
    if (fcmToken) NotifyService.send(fcmToken, data.title, data.body);
  };

  getByUserId = async (userId: string, page: number) => {
    const notifications = await Notification.findAll({
      where: { userId },
      offset: this.OFFSET(page),
      limit: NOTIFICATIONS_PER_PAGE,
      order: [["updateDate", "desc"]],
    });

    return notifications.map((n) => n.plain);
  };
}

export const NotificationService = new _NotificationService();
