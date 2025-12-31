import { createEnum } from "@shared/utils/create-enum";

export const USERNAME = { MIN: 3, MAX: 20 };

export const FULLNAME = { MIN: 3, MAX: 50 };

export const GENDER = createEnum(["male", "female", "other"] as const);

export const DOB = { MIN: 0, MAX: Infinity };
