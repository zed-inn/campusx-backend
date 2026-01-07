import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const NotificationGetPageSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type NotificationGetPageDto = z.infer<typeof NotificationGetPageSchema>;
