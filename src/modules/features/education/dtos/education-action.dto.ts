import { z } from "zod";
import { EducationModel } from "../education.model";

export const UniqueIdSchema = z.number("Invalid Unique Id");

export type UniqueIdDto = z.infer<typeof UniqueIdSchema>;

export const EducationCreateOneSchema = z.object({
  localId: EducationModel.fields.localId.default(null),
  instituteId: EducationModel.fields.instituteId,
  startYear: EducationModel.fields.startYear,
  startMonth: EducationModel.fields.startMonth.default(null),
  endYear: EducationModel.fields.endYear.default(null),
  endMonth: EducationModel.fields.endMonth.default(null),
  description: EducationModel.fields.description.default(null),
});

export type EducationCreateOneDto = z.infer<typeof EducationCreateOneSchema>;

export const EducationCreateSchema = z.object({
  educations: z.array(
    z.object({ ...EducationCreateOneSchema.shape, uniqueId: UniqueIdSchema })
  ),
});

export type EducationCreateDto = z.infer<typeof EducationCreateSchema>;

export const EducationUpdateSchema = EducationModel.dbSchema
  .pick({
    description: true,
    localId: true,
    instituteId: true,
    startMonth: true,
    startYear: true,
    endMonth: true,
    endYear: true,
  })
  .partial()
  .extend(EducationModel.dbSchema.pick({ id: true }).shape);

export type EducationUpdateDto = z.infer<typeof EducationUpdateSchema>;

export const EducationDeleteSchema = z.object({
  educationId: EducationModel.fields.id,
});

export type EducationDeleteDto = z.infer<typeof EducationDeleteSchema>;
