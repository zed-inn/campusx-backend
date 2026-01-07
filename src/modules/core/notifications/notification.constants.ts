import { createEnum } from "@shared/utils/create-enum";

export const NOTIFICATION = {
  TYPES: createEnum(["COMMENT", "LIKE", "MESSAGE"] as const),
};
