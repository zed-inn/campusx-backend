import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const modelSchema = <T extends z.ZodRawShape>(fields: T) => {
  const modelDbFields = z.object(fields);
  const modelDbSchema = BaseSchema.extend(modelDbFields.shape);

  return { dbFields: modelDbFields, dbSchema: modelDbSchema };
};
