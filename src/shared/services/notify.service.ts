import firebase from "@config/firebase/firebase";
import { response } from "express";
import { Message, MulticastMessage } from "firebase-admin/messaging";

export class NotifyService {
  static send = async (
    fcmToken: string | string[],
    title: string,
    body: string | null = null
  ) => {
    const message: Message | MulticastMessage = {
      ...(Array.isArray(fcmToken) ? { tokens: fcmToken } : { token: fcmToken }),
      notification: {
        title,
        ...(body ? { body } : {}),
      },
    };

    try {
      const _func = firebase.messaging();
      const response = await (Array.isArray(fcmToken)
        ? _func.sendEachForMulticast(message as MulticastMessage)
        : _func.send(message as Message));
      return response;
    } catch (error) {
      console.log(response);
      return false;
    }
  };
}
