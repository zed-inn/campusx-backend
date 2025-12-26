import { z } from "zod";

const baseFields = z.object({
  id: z.uuidv4("Invalid Id"),
  idNull: z.uuidv4("Invalid id").nullable().default(null),
  page: z.coerce
    .number("Invalid Page")
    .positive("Page starts from 1")
    .default(1),
  string: z.string("Invalid Value"),
  stringNull: z.string("Invalid Value").nullable().default(null),
  email: z.email("Invalid email"),
});

export const createSchema = <
  T extends Record<string, keyof typeof baseFields.shape>
>(
  mapping: T
) => {
  const sourceKeys = Object.values(mapping);

  const pickMask = sourceKeys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {} as Record<string, true>);

  return baseFields.pick(pickMask as any).transform((data) => {
    const result: any = {};

    for (const [newKey, sourceKey] of Object.entries(mapping)) {
      result[newKey] = data[sourceKey];
    }

    return result as {
      [K in keyof T]: z.infer<typeof baseFields>[T[K]];
    };
  });
};
