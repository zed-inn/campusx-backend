import { z } from "zod";
import { EducationSchema } from "./education-schema.dto";

export const EducationUpdateSchema = EducationSchema.pick({
  id: true,
}).extend({
  ...EducationSchema.pick({
    startYear: true,
    startMonth: true,
    endYear: true,
    endMonth: true,
    description: true,
  }).partial().shape,
});

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;
