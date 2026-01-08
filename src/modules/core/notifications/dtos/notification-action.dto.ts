import { NOTIFICATION_TYPE } from "@config/constants/notification-types";
import { NotificationModel } from "../notification.model";
import { z } from "zod";

export const NotificationCreateSchema = NotificationModel.dbSchema
  .pick({ body: true })
  .partial()
  .extend(NotificationModel.dbSchema.pick({ title: true }).shape)
  .extend({ type: z.enum(NOTIFICATION_TYPE._) });

export type NotificationCreateDto = z.infer<typeof NotificationCreateSchema>;
