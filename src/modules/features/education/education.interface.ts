import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { InstituteInterface } from "@modules/core/institutes";

export const EducationInterface = modelSchema({
  id: z.uuidv4("Invalid Education Id"),
  userId: z.uuidv4("Invalid User Id"),
  instituteId: z.uuidv4("Invalid Institute Id"),
  startYear: z.int("Invalid Start Year").positive("Invalid Start Year"),
  startMonth: z
    .int("Invalid Start Month")
    .min(1, { error: "Invalid Start Month" })
    .max(12, { error: "Invalid Start Month" }),
  endYear: z
    .int("Invalid End Year")
    .positive("Invalid End Year")
    .nullable()
    .default(null),
  endMonth: z
    .int("Invalid End Month")
    .min(1, { error: "Invalid End Month" })
    .max(12, { error: "Invalid End Month" })
    .nullable()
    .default(null),
  isCompleted: z.boolean("Invalid Complete Status").default(true),
});

export type EducationAttributes = z.infer<typeof EducationInterface.dbSchema>;

export type EducationCreationAttributes = Omit<
  z.infer<typeof EducationInterface.dbFields>,
  "id"
>;
