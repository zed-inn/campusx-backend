import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const ReviewInterface = modelSchema({
  id: z.uuidv4("Invalid Review Id"),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  body: z.string("Invalid Body"),
  rating: z
    .int("Invalid Rating")
    .min(0, { error: "Rating cannot be lower than 1" })
    .max(5, { error: "Rating cannot be higher than 5" }),
});

export type ReviewAttributes = z.infer<typeof ReviewInterface.dbSchema>;

export type ReviewCreationAttributes = Omit<
  z.infer<typeof ReviewInterface.dbFields>,
  "id"
>;
