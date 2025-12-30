import { z } from "zod";
import { InstituteSchema } from "./institute-schema.dto";

export const InstituteCreateSchema = InstituteSchema.pick({
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

export type InstituteCreateDto = z.infer<typeof InstituteCreateSchema>;
