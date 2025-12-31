import { createEnum } from "@shared/utils/create-enum";

export const FOLLOW_STATUS = createEnum(["ACTIVE", "BLOCKED"] as const);
