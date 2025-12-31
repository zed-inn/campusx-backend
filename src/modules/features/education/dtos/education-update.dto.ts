import { z } from "zod";
import { EducationModel } from "../education.model";
import { EducationCreateSchema } from "./education-create.dto";

export const EducationUpdateSchema = EducationModel.dbSchema
  .pick({
    id: true,
  })
  .extend(EducationCreateSchema.partial().shape);

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;
