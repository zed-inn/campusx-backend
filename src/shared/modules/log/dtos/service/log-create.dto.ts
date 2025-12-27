import { z } from "zod";
import { LogInterface } from "../../log.interface";

export const LogCreateSchema = z.object({
  req: LogInterface.fields.req.default(null),
  err: LogInterface.fields.err.default(null),
  meta: LogInterface.fields.meta.default(null),
});

export type LogCreateDto = z.infer<typeof LogCreateSchema>;
