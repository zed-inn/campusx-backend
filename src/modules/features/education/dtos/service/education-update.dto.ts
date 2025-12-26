import { z } from "zod";
import { EducationInterface } from "../../education.interface";

export const EducationUpdateSchema = z.object({
  id: EducationInterface.fields.id,
  ...EducationInterface.dbSchema
    .pick({
      startYear: true,
      startMonth: true,
      endYear: true,
      endMonth: true,
      isCompleted: true,
    })
    .partial().shape,
});

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;
