import firebase from "@config/firebase/firebase";
import { response } from "express";
import { Message } from "firebase-admin/messaging";

export class NotifyService {
  static send = async (
    fcmToken: string,
    title: string,
    body: string | null = null
  ) => {
    const message: Message = {
      token: fcmToken,
      notification: {
        title,
        ...(body ? { body } : {}),
      },
    };

    try {
      const response = await firebase.messaging().send(message);
      return response;
    } catch (error) {
      console.log(response);
      return false;
    }
  };
}
