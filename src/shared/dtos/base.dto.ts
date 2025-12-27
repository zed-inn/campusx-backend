import { z } from "zod";

export const BaseSchema = z.object({
  createDate: z.number().int().nonnegative(),
  updateDate: z.number().int().nonnegative(),
});
