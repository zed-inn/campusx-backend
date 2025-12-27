import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { FEEDBACK_CONFIG } from "./feedback.config";
import { ProfileResMin } from "@modules/core/profile";

export const FeedbackInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Feedback Id"),
    userId: z.uuidv4("Invalid User Id").nullable().default(null),
    message: z.string("Invalid Message"),
    status: z.enum(Object.values(FEEDBACK_CONFIG.STATUS), {
      error: "Invalid Status",
    }),
  },
  {
    writer: ProfileResMin.nullable(),
  }
);

export type FeedbackAttributes = z.infer<typeof FeedbackInterface.dbSchema>;

export type FeedbackCreationAttributes = Omit<
  z.infer<typeof FeedbackInterface.dbFields>,
  "id"
>;
