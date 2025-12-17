import { env } from "@config/env";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const UserInterface = modelSchema(
  {
    id: z.uuidv4("Invalid User Id"),
    email: z.email("Invalid Email"),
    passwordHash: z.string("Invalid Password").nullable(),
    fcmToken: z.string("Invalid Fcm Token").nullable(),
    referralCode: z
      .string("Invalid Referral Code")
      .length(env.REFERRAL_CODE_LENGTH, {
        error: "Invalid Referral Code",
      }),
  },
  {
    password: z
      .string("Invalid Password")
      .min(8, { error: "Password should be of atleast length 8" }),
  }
);

export type UserAttributes = z.infer<typeof UserInterface.dbSchema>;

export type UserCreationAttributes = Omit<
  z.infer<typeof UserInterface.dbFields>,
  "id" | "fcmToken" | "profiled"
>;
