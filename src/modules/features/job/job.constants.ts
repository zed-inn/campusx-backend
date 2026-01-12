import { createEnum } from "@shared/utils/create-enum";

export const JOB = {
  TITLE: { LENGTH: { MIN: 3 } },
  TYPES: createEnum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "FREELANCE",
    "CONTRACT",
    "GOVT",
    "WALK_IN",
  ] as const),
  STATUS: createEnum(["DRAFT", "ACTIVE", "CLOSED", "EXPIRED"] as const),
  SALARY: {
    PERIODS: createEnum(["HOURLY", "MONTHLY", "YEARLY", "ONE_TIME"] as const),
  },
};
