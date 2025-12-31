import { createEnum } from "@shared/utils/create-enum";

export const MESSAGE_STATUS = createEnum([
  "Sending",
  "Sent",
  "Forwarded",
  "Received",
] as const);
