import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { ProfileInterface } from "@modules/core/profile";
import { FEEDBACK_CONFIG } from "./feedback.config";

export const FeedbackInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Feedback Id"),
    userId: z.uuidv4("Invalid User Id").nullable(),
    message: z.string("Invalid Message"),
    status: z.enum(Object.values(FEEDBACK_CONFIG.STATUS), {
      error: "Invalid Status",
    }),
  },
  {
    writer: z
      .object({
        id: ProfileInterface.fields.id,
        fullName: ProfileInterface.fields.fullName,
        avatarUrl: ProfileInterface.fields.avatarUrl,
      })
      .nullable(),
  }
);

export type FeedbackAttributes = z.infer<typeof FeedbackInterface.dbSchema>;

export type FeedbackCreationAttributes = Omit<
  z.infer<typeof FeedbackInterface.dbFields>,
  "id"
>;
