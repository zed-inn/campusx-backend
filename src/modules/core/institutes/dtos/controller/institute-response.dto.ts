import { z } from "zod";
import { InstituteInterface } from "../../institute.interface";

export const InstituteResponseMaxSchema = InstituteInterface.dbSchema.pick({
  id: true,
  about: true,
  address: true,
  administrativeMinistry: true,
  aisheCode: true,
  category: true,
  collegeType: true,
  country: true,
  createDate: true,
  district: true,
  imageUrl: true,
  landline: true,
  location: true,
  management: true,
  name: true,
  phone: true,
  pinCode: true,
  rating: true,
  reviewsCount: true,
  shortName: true,
  standaloneType: true,
  state: true,
  universityName: true,
  universityType: true,
  updateDate: true,
  website: true,
  yearOfEstablishment: true,
});

export type InstituteResponseMaxDto = z.infer<
  typeof InstituteResponseMaxSchema
>;

export const InstituteResponseMinSchema = InstituteInterface.dbSchema.pick({
  id: true,
  name: true,
  aisheCode: true,
  shortName: true,
  about: true,
  district: true,
  state: true,
  country: true,
  yearOfEstablishment: true,
  website: true,
  imageUrl: true,
  category: true,
});

export type InstituteResponseMinDto = z.infer<
  typeof InstituteResponseMinSchema
>;
