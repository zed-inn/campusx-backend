import { z } from "zod";
import { NotificationModel } from "../../notification.model";
import { UserModel } from "@modules/core/user";

export const NotificationCreateSchema = NotificationModel.dbFields
  .omit({
    id: true,
    type: true,
    userId: true,
  })
  .extend({
    userIds: z
      .array(z.object({ id: UserModel.fields.id }))
      .nullable()
      .default(null),
  });

export type NotificationCreateDto = z.infer<typeof NotificationCreateSchema>;
