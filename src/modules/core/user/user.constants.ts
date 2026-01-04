import { createEnum } from "@shared/utils/create-enum";

export const USER = {
  ROLES: createEnum(["STUDENT", "ADMIN"] as const),
  REFERRAL_CODE: {
    LENGTH: {
      MIN: 8,
      MAX: 8,
    },
  },
};
