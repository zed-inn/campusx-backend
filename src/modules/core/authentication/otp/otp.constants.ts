import { createEnum } from "@shared/utils/create-enum";

export const OTP = {
  LENGTH: 4,
  VALIDITY: {
    MINUTES: 30,
  },
  POLICY: {
    REPLACEMENT: true,
  },
  ACTIONS: createEnum(["REGISTER", "RECOVERY"] as const),
};

export const OTP_TOKEN = {
  VALIDITY: {
    MINUTES: 600,
  },
};
