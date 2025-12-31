import { createEnum } from "@shared/utils/create-enum";

export const STATUS = createEnum(["Draft", "Published", "On Review"] as const);

export const CATEGORY_LENGTH = { MIN: 3 };
