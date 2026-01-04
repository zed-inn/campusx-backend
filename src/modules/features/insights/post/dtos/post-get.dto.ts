import { GlobalSchema } from "@shared/dtos/global.dto";
import { z } from "zod";

export const PostGetSchema = z.object({
  categories: z.string("Invalid Categories").optional(),
  page: GlobalSchema.fields.page,
});

export type PostGetDto = z.infer<typeof PostGetSchema>;
