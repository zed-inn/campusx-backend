import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const LogGetPageSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type LogGetPageDto = z.infer<typeof LogGetPageSchema>;
