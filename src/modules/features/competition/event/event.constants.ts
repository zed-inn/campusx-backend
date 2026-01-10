import { createEnum } from "@shared/utils/create-enum";

export const EVENT = {
  NAME: { LENGTH: { MIN: 1, MAX: 100 } },
  DESCRIPTION: { LENGTH: { MIN: 1, MAX: 1000 } },
  STATUS: createEnum(["QUEUED", "ONGOOING", "ENDED"] as const),
  RULES: { HOW_MANY: { MIN: 0, MAX: 20 } },
};
