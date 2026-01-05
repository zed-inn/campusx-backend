import { createEnum } from "@shared/utils/create-enum";

export const MESSAGE = {
  STATUS: createEnum(["Sending", "Sent", "Forwarded", "Received"] as const),
  BODY: { LENGTH: { MIN: 1, MAX: 1000 } },
};
