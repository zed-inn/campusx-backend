import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

const UserDbFields = z.object({
  id: z.uuidv4(),
  email: z.email(),
  passwordHash: z.string().nullable(),
  fcmToken: z.string().nullable(),
  profiled: z.boolean().default(false),
});

const UserDbSchema = BaseSchema.extend(UserDbFields.shape);

export type UserAttributes = z.infer<typeof UserDbSchema>;

export type UserCreationAttributes = Omit<
  z.infer<typeof UserDbFields>,
  "id" | "fcmToken" | "profiled"
>;
