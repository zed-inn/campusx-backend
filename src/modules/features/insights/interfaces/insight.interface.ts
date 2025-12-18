import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { INSIGHT_CONFIG } from "../insight.config";

export const InsightInterface = modelSchema({
  id: z.uuidv4("Invalid Insight Id"),
  title: z.string("Invalid Title").nullable(),
  body: z.string("Invalid Body").nullable(),
  hindiTitle: z.string("Invalid Hindi Title").nullable(),
  hindiBody: z.string("Invalid Hindi Body").nullable(),
  imageUrl: z.url("Invalid Image Url").nullable(),
  categoryId: z.uuidv4("Invalid Category Id").nullable(),
  status: z.enum(Object.values(INSIGHT_CONFIG.STATUS), {
    error: "Invalid Insight Status",
  }),
});

export type InsightAttributes = z.infer<typeof InsightInterface.dbSchema>;

export type InsightCreationAttributes = Omit<
  z.infer<typeof InsightInterface.dbFields>,
  "id"
>;
