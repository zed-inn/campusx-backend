import { createEnum } from "@shared/utils/create-enum";

export const FEEDBACK = {
  STATUS: createEnum(["PENDING", "CONSIDERING", "APPLIED"] as const),
  MESSAGE: { LENGTH: { MIN: 1, MAX: 1000 } },
  PLATFORMS: createEnum(["LANDING_PAGE", "MOBILE_APP"] as const),
};
