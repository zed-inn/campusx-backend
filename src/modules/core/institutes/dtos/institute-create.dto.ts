import { z } from "zod";
import { InstituteModel } from "../institute.model";

export const CreateBySheetSchema = z.object({
  name: InstituteModel.fields.name,
  aisheCode: InstituteModel.fields.aisheCode.default(null),
  shortName: InstituteModel.fields.shortName.default(null),
  about: InstituteModel.fields.about.default(null),
  district: InstituteModel.fields.district.default(null),
  state: InstituteModel.fields.state.default(null),
  country: InstituteModel.fields.country.default(null),
  address: InstituteModel.fields.address.default(null),
  pinCode: InstituteModel.fields.pinCode.default(null),
  yearOfEstablishment: InstituteModel.fields.yearOfEstablishment.default(null),
  website: InstituteModel.fields.website.default(null),
  location: InstituteModel.fields.location.default(null),
  category: InstituteModel.fields.category.default(null),
  administrativeMinistry:
    InstituteModel.fields.administrativeMinistry.default(null),
  standaloneType: InstituteModel.fields.standaloneType.default(null),
  management: InstituteModel.fields.management.default(null),
  collegeType: InstituteModel.fields.collegeType.default(null),
  universityName: InstituteModel.fields.universityName.default(null),
  universityType: InstituteModel.fields.universityType.default(null),
  phone: InstituteModel.fields.phone.default(null),
  landline: InstituteModel.fields.landline.default(null),
  imageUrl: InstituteModel.fields.imageUrl.default(null),
});

export type CreateBySheetDto = z.infer<typeof CreateBySheetSchema>;
