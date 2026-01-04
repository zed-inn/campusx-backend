import { createEnum } from "@shared/utils/create-enum";

export const PROFILE = {
  USERNAME: { LENGTH: { MIN: 3, MAX: 20 } },
  FULLNAME: { LENGTH: { MIN: 3, MAX: 50 } },
  GENDER: createEnum(["male", "female", "other"] as const),
};
