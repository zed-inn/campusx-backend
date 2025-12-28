import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { AMBASSADOR_CONFIG } from "./ambassador.config";

export const AmbassadorInterface = modelSchema({
  id: z.uuidv4("Invalid Ambassador Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  reasonToBecome: z.string("Invalid Reason").nullable().default(null),
  status: z
    .enum(Object.values(AMBASSADOR_CONFIG.STATUS))
    .default(AMBASSADOR_CONFIG.STATUS.PENDING),
});

export type AmbassadorAttributes = z.infer<typeof AmbassadorInterface.dbSchema>;

export type AmbassadorCreationAttributes = Omit<
  z.infer<typeof AmbassadorInterface.dbFields>,
  "status"
>;
