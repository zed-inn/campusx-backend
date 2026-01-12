import { BaseService } from "@shared/services/base.service";
import { Notification, NotificationInstance } from "../notification.model";
import { NotificationCreateDto } from "./dtos/notification-action.admin.dto";
import db from "@config/database";
import { UserService } from "@modules/core/user";
import { NotifyService } from "@shared/services/notify.service";

class _NotificationService extends BaseService<NotificationInstance> {
  constructor() {
    super(Notification);
  }

  save = async (data: NotificationCreateDto) => {
    const users = data.userIds ?? (await UserService.getAllIds());

    const fcmTokens = (await UserService.getByIds(users.map((u) => u.id)))
      .map((u) => u.fcmToken)
      .filter((f) => f !== null);

    const notificationsToCreate: {
      title: string;
      body: string | null;
      userId: string;
      type: "ADMIN";
    }[] = [];
    users.map((u) =>
      notificationsToCreate.push({
        title: data.title,
        body: data.body,
        userId: u.id,
        type: "ADMIN",
      })
    );

    await db.transaction(async () => {
      await Notification.bulkCreate(notificationsToCreate);

      NotifyService.send(fcmTokens, data.title, data.body);
    });
  };
}

export const NotificationService = new _NotificationService();
