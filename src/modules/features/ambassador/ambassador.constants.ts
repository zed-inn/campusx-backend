import { createEnum } from "@shared/utils/create-enum";

export const REQUEST_STATUS = createEnum([
  "PENDING",
  "REJECTED",
  "ACCEPTED",
] as const);
