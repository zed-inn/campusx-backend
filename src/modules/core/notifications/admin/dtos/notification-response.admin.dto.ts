import { z } from "zod";
import { NotificationModel } from "../../notification.model";

export const NotificationSchema = NotificationModel.dbSchema;

export type NotificationDto = z.infer<typeof NotificationSchema>;
