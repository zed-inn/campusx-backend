import { z } from "zod";
import { EducationModel } from "../education.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const EducationGetUserSchema = z.object({
  userId: EducationModel.fields.userId,
  page: GlobalSchema.fields.page,
});

export type EducationGetUserDto = z.infer<typeof EducationGetUserSchema>;

export const EducationGetMineSchema = z.object({
  page: GlobalSchema.fields.page,
});

export type EducationGetMineDto = z.infer<typeof EducationGetMineSchema>;

export const EducationGetStudentsSchema = z.object({
  instituteId: EducationModel.fields.instituteId,
  page: GlobalSchema.fields.page,
});

export type EducationGetStudentsDto = z.infer<
  typeof EducationGetStudentsSchema
>;
