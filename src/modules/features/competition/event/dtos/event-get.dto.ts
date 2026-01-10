import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const EventGetPageSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type EventGetPageDto = z.infer<typeof EventGetPageSchema>;
