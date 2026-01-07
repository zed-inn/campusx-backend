import { NotificationModel } from "../notification.model";
import { z } from "zod";

export const NotificationSchema = NotificationModel.dbSchema;

export type NotificationDto = z.infer<typeof NotificationSchema>;
