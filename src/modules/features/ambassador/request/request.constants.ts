import { createEnum } from "@shared/utils/create-enum";

export const REQUEST = {
  STATUS: createEnum(["PENDING", "REJECTED", "ACCEPTED", "LEFT"] as const),
  REASON: { LENGTH: { MIN: 1, MAX: 2000 } },
};
