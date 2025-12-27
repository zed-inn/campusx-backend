import { UserService } from "@modules/core/user";
import { NotificationSendDto } from "./dtos/notification-send.dto";
import { Message } from "firebase-admin/lib/messaging/messaging-api";
import firebase from "@config/firebase/firebase";
import { Notification } from "./notification.model";

export class NotificationService {
  static getFcmTokenByUserId = async (userId: string) => {
    const service = await UserService.getById(userId);
    return service.data.fcmToken;
  };

  static sendByFcmToken = async (
    fcmToken: string,
    data: NotificationSendDto
  ) => {
    const message: Message = {
      token: fcmToken,
      notification: {
        title: data.title,
        ...(data.body ? { body: data.body } : {}),
      },
    };

    try {
      const response = await firebase.messaging().send(message);
    } catch (error) {
      console.log(error);
    }
  };

  static save = async (userId: string, data: NotificationSendDto) => {
    const notification = await Notification.create({ ...data, userId });
    return notification.get({ plain: true });
  };

  static notify = async (userId: string, data: NotificationSendDto) => {
    try {
      const fcmToken = await this.getFcmTokenByUserId(userId);
      await this.save(userId, data);
      if (fcmToken) await this.sendByFcmToken(fcmToken, data);
    } catch {}
  };
}
