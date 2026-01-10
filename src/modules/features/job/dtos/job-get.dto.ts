import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const JobGetPageSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type JobGetPageDto = z.infer<typeof JobGetPageSchema>;
