import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const UserInterface = modelSchema({
  id: z.uuidv4(),
  email: z.email(),
  passwordHash: z.string().nullable(),
  fcmToken: z.string().nullable(),
});

export type UserAttributes = z.infer<typeof UserInterface.dbSchema>;

export type UserCreationAttributes = Omit<
  z.infer<typeof UserInterface.dbFields>,
  "id" | "fcmToken" | "profiled"
>;
