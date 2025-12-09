import { z } from "zod";

export const BaseSchema = z.object({
  createDate: z.number().int(),
  updateDate: z.number().int(),
});
