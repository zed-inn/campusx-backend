import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export function modelSchema<T extends z.ZodRawShape>(fields: T) {
  const modelDbFields = z.object(fields);
  const modelDbSchema = BaseSchema.extend(fields);

  return {
    dbFields: modelDbFields,
    dbSchema: modelDbSchema,
    fields,
  };
}
