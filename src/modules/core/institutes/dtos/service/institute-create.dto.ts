import { z } from "zod";
import { InstituteInterface } from "../../institute.interface";

export const InstituteCreateSchema = InstituteInterface.dbSchema.pick({
  name: true,
  aisheCode: true,
  shortName: true,
  about: true,
  district: true,
  state: true,
  country: true,
  address: true,
  pinCode: true,
  website: true,
  location: true,
  category: true,
  standaloneType: true,
  management: true,
  collegeType: true,
  universityName: true,
  universityType: true,
  phone: true,
  landline: true,
  imageUrl: true,
});

export type InstituteCreateDto = z.infer<typeof InstituteCreateSchema>;
