import { InstituteSchema } from "@modules/core/institutes";
import { BaseSchema } from "@shared/dtos/base.dto";
import { z } from "zod";

export const InstituteOldSchema = BaseSchema.extend({
  id: z.uuidv4(),
  aishe_code: z.string(),
  name: z.string(),
  state: z.string().nullable(),
  district: z.string().nullable(),
  website: z.string().nullable(),
  year_of_establishment: z.string().nullable(),
  location: z.string().nullable(),
  instituteType: z.string(),
  administrative_ministry: z.string().nullable(),
  standalone_type: z.string().nullable(),
  management: z.string().nullable(),
  college_type: z.string().nullable(),
  university_name: z.string().nullable(),
  university_type: z.string().nullable(),
  about: z.string().nullable(),
  shortName: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  landline: z.string().nullable(),
  country: z.string().nullable(),
  pinCode: z.string().nullable(),
  imageUrl: z.string().nullable(),
});
export type InstituteOldDto = z.infer<typeof InstituteOldSchema>;
export type InstituteDto = z.infer<typeof InstituteSchema>;

export const takeFieldsSchema = InstituteOldSchema.pick({
  about: true,
  address: true,
  administrative_ministry: true,
  country: true,
  district: true,
  standalone_type: true,
  imageUrl: true,
  landline: true,
  location: true,
  management: true,
  phone: true,
  pinCode: true,
  shortName: true,
  website: true,
  year_of_establishment: true,
});

export const fieldsOldToNewMap = {
  about: "about",
  address: "address",
  administrative_ministry: "administrativeMinistry",
  country: "country",
  district: "district",
  standalone_type: "standaloneType",
  imageUrl: "imageUrl",
  landline: "landline",
  location: "location",
  management: "management",
  phone: "phone",
  pinCode: "pinCode",
  shortName: "shortName",
  website: "website",
  year_of_establishment: "yearOfEstablishment",
} as const;
