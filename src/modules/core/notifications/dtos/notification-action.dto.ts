import { NotificationModel } from "../notification.model";
import { z } from "zod";

export const NotificationCreateSchema = NotificationModel.dbSchema
  .pick({ body: true })
  .partial()
  .extend(NotificationModel.dbSchema.pick({ title: true, type: true }).shape);

export type NotificationCreateDto = z.infer<typeof NotificationCreateSchema>;
