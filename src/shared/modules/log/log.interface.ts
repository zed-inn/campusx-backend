import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { LOG_CONFIG } from "./log.config";

export const LogInterface = modelSchema({
  id: z.uuidv4("Invalid Id"),
  level: z.enum(Object.values(LOG_CONFIG.LEVELS), {
    error: "Invalid Log Level",
  }),
  message: z.string("Invalid Log Message"),
  req: z.any().nullable(),
  err: z.any().nullable(),
  meta: z.any().nullable(),
});

export type LogAttributes = z.infer<typeof LogInterface.dbSchema>;

export type LogCreationAttributes = Omit<
  z.infer<typeof LogInterface.dbFields>,
  "id"
>;
