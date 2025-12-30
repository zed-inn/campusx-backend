import { z } from "zod";

const baseFields = z.object({
  id: z.uuidv4("Invalid Id"),
  idNull: z.uuidv4("Invalid id").nullable().default(null),
  page: z.coerce
    .number("Invalid Page")
    .positive("Page starts from 1")
    .default(1),
  number: z.number().nonnegative(),
  string: z.string("Invalid Value"),
  stringNull: z.string("Invalid Value").nullable().default(null),
  email: z.email("Invalid email"),
});

export class s {
  static create = <T extends z.ZodRawShape>(mapping: T) => {
    return z.object(mapping);
  };

  static fields = baseFields.shape;
}
