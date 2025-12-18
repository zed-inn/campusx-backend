import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { NOTIFICATION_CONFIG } from "./notification.config";

export const NotificationInterface = modelSchema({
  id: z.uuidv4("Invalid Id"),
  userId: z.uuidv4("Invalid User Id"),
  title: z.string("Invalid Notification Title"),
  body: z.string("Invalid Notification Body").nullable(),
  type: z.enum(NOTIFICATION_CONFIG.TYPES, {
    error: "Invalid Notification Type",
  }),
});

export type NotificationAttributes = z.infer<
  typeof NotificationInterface.dbSchema
>;

export type NotificationCreationAttributes = Omit<
  z.infer<typeof NotificationInterface.dbFields>,
  "id"
>;
