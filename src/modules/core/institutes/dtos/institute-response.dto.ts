import { z } from "zod";
import { InstituteModel } from "../institute.model";

export const ResponseFullSchema = InstituteModel.dbSchema.pick({
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

export type ResponseFullDto = z.infer<typeof ResponseFullSchema>;

export const ResponseSmallSchema = ResponseFullSchema.pick({
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

export type ResponseSmallDto = z.infer<typeof ResponseSmallSchema>;
