import { z } from "zod";
import { InstituteModel } from "../institute.model";
import { GlobalSchema } from "@shared/dtos/global.dto";

export const InstituteGetOneSchema = z.object({
  instituteId: InstituteModel.fields.id,
});

export type InstituteGetOneDto = z.infer<typeof InstituteGetOneSchema>;

export const InstituteGetPageSchema = z.object({
  name: InstituteModel.fields.name.optional(),
  district: InstituteModel.fields.district.optional(),
  state: InstituteModel.fields.state.optional(),
  page: GlobalSchema.fields.page,
});

export type InstituteGetPageDto = z.infer<typeof InstituteGetPageSchema>;
