import { z } from "zod";

export const UserWalletSchema = z.object({
  referralCode: z.string(),
  wallet: z.object({ balance: z.number() }),
});

export type UserWalletDto = z.infer<typeof UserWalletSchema>;
