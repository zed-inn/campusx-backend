import { createEnum } from "@shared/utils/create-enum";

export const STATUS = createEnum([
  "PENDING",
  "CONSIDERING",
  "APPLIED",
] as const);
