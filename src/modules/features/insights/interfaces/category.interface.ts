import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { INSIGHT_CONFIG } from "../insight.config";

export const CategoryInterface = modelSchema({
  id: z.uuidv4("Invalid Category Id"),
  name: z
    .string("Invalid Category Name")
    .min(INSIGHT_CONFIG.CATEGORY.MIN, { error: "Category name is too short." }),
});

export type CategoryAttributes = z.infer<typeof CategoryInterface.dbSchema>;

export type CategoryCreationAttributes = Omit<
  z.infer<typeof CategoryInterface.dbFields>,
  "id"
>;
