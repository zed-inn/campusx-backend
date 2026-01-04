import { createEnum } from "@shared/utils/create-enum";

export const POST = {
  TITLE: { LENGTH: { MIN: 1, MAX: 100 } },
  BODY: { LENGTH: { MIN: 1, MAX: 400 } },
  STATUS: createEnum(["Draft", "Published", "On Review"] as const),
};
