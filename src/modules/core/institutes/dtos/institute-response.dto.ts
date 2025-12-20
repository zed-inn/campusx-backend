import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";
import { InstituteInterface } from "../institute.interface";

export const InstituteResponseSchema = BaseSchema.extend({
  id: InstituteInterface.fields.id,
  name: InstituteInterface.fields.name,
  aisheCode: InstituteInterface.fields.aisheCode,
  shortName: InstituteInterface.fields.shortName,
  about: InstituteInterface.fields.about,
  district: InstituteInterface.fields.district,
  state: InstituteInterface.fields.state,
  country: InstituteInterface.fields.country,
  address: InstituteInterface.fields.address,
  pinCode: InstituteInterface.fields.pinCode,
  yearOfEstablishment: InstituteInterface.fields.yearOfEstablishment,
  website: InstituteInterface.fields.website,
  location: InstituteInterface.fields.location,
  category: InstituteInterface.fields.category,
  administrativeMinistry: InstituteInterface.fields.administrativeMinistry,
  standaloneType: InstituteInterface.fields.standaloneType,
  management: InstituteInterface.fields.management,
  collegeType: InstituteInterface.fields.collegeType,
  universityName: InstituteInterface.fields.universityName,
  universityType: InstituteInterface.fields.universityType,
  phone: InstituteInterface.fields.phone,
  landline: InstituteInterface.fields.landline,
  imageUrl: InstituteInterface.fields.imageUrl,
  rating: InstituteInterface.fields.rating,
  reviewsCount: InstituteInterface.fields.reviewsCount,
});

export type InstituteResponseDto = z.infer<typeof InstituteResponseSchema>;
