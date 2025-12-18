import { z } from "zod";
import { NotificationInterface } from "../notification.interface";

export const NotificationSendSchema = z.object({
  title: NotificationInterface.fields.title,
  body: NotificationInterface.fields.body.default(null),
  type: NotificationInterface.fields.type,
});

export type NotificationSendDto = z.infer<typeof NotificationSendSchema>;
