import { z } from "zod";
import { InstituteInterface } from "../institute.interface";

export const InstituteCreateSchema = z.object({
  name: InstituteInterface.fields.name,
  aisheCode: InstituteInterface.fields.aisheCode.default(null),
  shortName: InstituteInterface.fields.shortName.default(null),
  about: InstituteInterface.fields.about.default(null),
  district: InstituteInterface.fields.district.default(null),
  state: InstituteInterface.fields.state.default(null),
  country: InstituteInterface.fields.country.default(null),
  address: InstituteInterface.fields.address.default(null),
  pinCode: InstituteInterface.fields.pinCode.default(null),
  yearOfEstablishment:
    InstituteInterface.fields.yearOfEstablishment.default(null),
  website: InstituteInterface.fields.website.default(null),
  location: InstituteInterface.fields.location.default(null),
  category: InstituteInterface.fields.category.default(null),
  administrativeMinistry:
    InstituteInterface.fields.administrativeMinistry.default(null),
  standaloneType: InstituteInterface.fields.standaloneType.default(null),
  management: InstituteInterface.fields.management.default(null),
  collegeType: InstituteInterface.fields.collegeType.default(null),
  universityName: InstituteInterface.fields.universityName.default(null),
  universityType: InstituteInterface.fields.universityType.default(null),
  phone: InstituteInterface.fields.phone.default(null),
  landline: InstituteInterface.fields.landline.default(null),
  imageUrl: InstituteInterface.fields.imageUrl.default(null),
});

export type InstituteCreateDto = z.infer<typeof InstituteCreateSchema>;
