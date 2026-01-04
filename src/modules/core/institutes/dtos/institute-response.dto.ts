import { z } from "zod";
import { InstituteModel } from "../institute.model";

export const InstituteSchema = InstituteModel.dbSchema.omit({
  nameNormalized: true,
});

export type InstituteDto = z.infer<typeof InstituteSchema>;

export const ShortInstituteSchema = InstituteSchema.pick({
  id: true,
  name: true,
  shortName: true,
  district: true,
  state: true,
  country: true,
  yearOfEstablishment: true,
});

export type ShortInstituteDto = z.infer<typeof ShortInstituteSchema>;
