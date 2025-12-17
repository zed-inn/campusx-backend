import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

type ExtendedSchema<T extends z.ZodRawShape> = ReturnType<
  typeof BaseSchema.extend<T>
>;

export function modelSchema<T extends z.ZodRawShape>(
  fields: T,
  extraFields?: null
): {
  dbFields: z.ZodObject<T>;
  dbSchema: ExtendedSchema<T>;
  fields: ExtendedSchema<T>["shape"];
};

export function modelSchema<T extends z.ZodRawShape, W extends z.ZodRawShape>(
  fields: T,
  extraFields: W
): {
  dbFields: z.ZodObject<T>;
  dbSchema: ExtendedSchema<T>;
  fields: ExtendedSchema<T>["shape"];
  extra: {
    schema: z.ZodObject<W>;
    fields: W;
  };
};

export function modelSchema<T extends z.ZodRawShape, W extends z.ZodRawShape>(
  fields: T,
  extraFields: any = null
) {
  const modelDbFields = z.object(fields);
  const modelDbSchema = BaseSchema.extend(fields);
  const modelShape = modelDbSchema.shape;

  const modelRes = {
    dbFields: modelDbFields,
    dbSchema: modelDbSchema,
    fields: modelShape,
  };

  if (extraFields) {
    const extraSchema = z.object(extraFields);
    return {
      ...modelRes,
      extra: { schema: extraSchema, fields: extraSchema.shape },
    };
  }

  return modelRes;
}
