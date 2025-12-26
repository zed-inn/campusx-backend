import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { INSIGHT_CONFIG } from "../insight.config";

export const InsightInterface = modelSchema({
  id: z.uuidv4("Invalid Insight Id"),
  title: z.string("Invalid Title").nullable().default(null),
  body: z.string("Invalid Body").nullable().default(null),
  hindiTitle: z.string("Invalid Hindi Title").nullable().default(null),
  hindiBody: z.string("Invalid Hindi Body").nullable().default(null),
  imageUrl: z.url("Invalid Image Url").nullable().default(null),
  categoryId: z.uuidv4("Invalid Category Id").nullable().default(null),
  status: z.enum(Object.values(INSIGHT_CONFIG.STATUS), {
    error: "Invalid Insight Status",
  }),
});

export type InsightAttributes = z.infer<typeof InsightInterface.dbSchema>;

export type InsightCreationAttributes = Omit<
  z.infer<typeof InsightInterface.dbFields>,
  "id"
>;
