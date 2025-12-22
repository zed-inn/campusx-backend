import { ProfileInterface } from "@modules/core/profile";
import { modelSchema } from "@shared/utils/model-schema";
import { z } from "zod";

export const ReportInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Report Id"),
    forumId: z.uuidv4("Invalid Forum Id"),
    userId: z.uuidv4("Invalid User Id"),
    reason: z.string("Invalid Reason").min(1, { error: "Reason is required" }),
  },
  {
    user: z.object({
      id: ProfileInterface.fields.id,
      fullName: ProfileInterface.fields.fullName,
      username: ProfileInterface.fields.username,
      avatarUrl: ProfileInterface.fields.avatarUrl,
    }),
  }
);

export type ReportAttributes = z.infer<typeof ReportInterface.dbSchema>;

export type ReportCreationAttributes = Omit<
  z.infer<typeof ReportInterface.dbFields>,
  "id"
>;
