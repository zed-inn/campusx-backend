import { z } from "zod";
import { EducationModel } from "../education.model";

export const EducationCreateSchema = z.object({
  localId: EducationModel.fields.localId.default(null),
  instituteId: EducationModel.fields.instituteId,
  startYear: EducationModel.fields.startYear,
  startMonth: EducationModel.fields.startMonth.default(null),
  endYear: EducationModel.fields.endYear.default(null),
  endMonth: EducationModel.fields.endMonth.default(null),
  description: EducationModel.fields.description.default(null),
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;

export const EducationUpdateSchema = EducationModel.dbSchema.pick({
  id: true,
  description: true,
  localId: true,
  instituteId: true,
  startMonth: true,
  startYear: true,
  endMonth: true,
  endYear: true,
});

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;

export const EducationDeleteSchema = z.object({
  educationId: EducationModel.fields.id,
});

export type EducationDeleteDto = z.infer<typeof EducationDeleteSchema>;
