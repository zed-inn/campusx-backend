import { WALLET } from "@config/constants/coins-per-action";
import { Profile } from "./profile.model";
import { NotificationService } from "../notifications";
import { ReferralUseService } from "../user";
import { ProfileService } from "./profile.service";

export const ProfileHooks = () => {
  // Hooks
  Profile.afterCreate(async (profile) => {
    const p = profile.plain;

    if (WALLET.REGISTRATION)
      await NotificationService.createNew(
        {
          type: "REGISTER",
          title: `Registration Successfull`,
          body: `You just got ${WALLET.REGISTRATION} coins.`,
        },
        p.id
      );

    let referralUsed = false;
    try {
      await ReferralUseService.getByUserId(p.id);
      referralUsed = true;
    } catch {
      referralUsed = false;
    }
    if (WALLET.REFERRAL && referralUsed) {
      const u = (
        await ProfileService.getById(
          (
            await ReferralUseService.getByUserId(p.id)
          ).plain.referrerId
        )
      ).plain;

      await NotificationService.createNew(
        {
          type: "REFERRAL_USE",
          title: `You just got ${WALLET.REFERRAL} coins.`,
          body: `${p.fullName}${
            p.username ? ` (@${p.username})` : ""
          } just used your referral code to register.`,
        },
        u.id
      );

      await NotificationService.createNew(
        {
          type: "REFERRAL_USE",
          title: `You just got ${WALLET.REFERRAL} coins.`,
          body: `You just used the referral code of ${u.fullName}${
            u.username ? ` (@${u.username})` : ""
          }`,
        },
        p.id
      );
    }
  });
};
