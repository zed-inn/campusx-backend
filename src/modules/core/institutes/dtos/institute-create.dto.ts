import { z } from "zod";
import { InstituteModel } from "../institute.model";

export const CreateBySheetSchema = InstituteModel.dbSchema.pick({
  name: true,
  aisheCode: true,
  shortName: true,
  about: true,
  district: true,
  state: true,
  country: true,
  address: true,
  pinCode: true,
  yearOfEstablishment: true,
  website: true,
  location: true,
  category: true,
  administrativeMinistry: true,
  standaloneType: true,
  management: true,
  collegeType: true,
  universityName: true,
  universityType: true,
  phone: true,
  landline: true,
  imageUrl: true,
});

export type CreateBySheetDto = z.infer<typeof CreateBySheetSchema>;
