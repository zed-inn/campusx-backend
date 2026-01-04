import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const CategoryGetPageSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type CategoryGetPageDto = z.infer<typeof CategoryGetPageSchema>;
