import { createEnum } from "@shared/utils/create-enum";

export const NOTIFICATION_TYPE = createEnum([
  "COMMENT",
  "REPLY",
  "LIKE",
  "AMBASSADOR_REQUEST",
  "MESSAGE",
  "FOLLOW",
  "REFERRAL_USE",
] as const);
