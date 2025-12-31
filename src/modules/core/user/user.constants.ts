import { createEnum } from "@shared/utils/create-enum";

export const USER_ROLES = createEnum(["STUDENT", "ADMIN"] as const);

export const REFERRAL_CODE_LENGTH = { MIN: 8, MAX: 8 };
