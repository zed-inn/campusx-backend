import { z } from "zod";
import { ReferralUseModel } from "../referral-use.model";

export const ReferralUseCreateSchema = ReferralUseModel.dbSchema.pick({
  deviceId: true,
  referralCodeUsed: true,
  referrerId: true,
  userId: true,
});

export type ReferralUseCreateDto = z.infer<typeof ReferralUseCreateSchema>;
