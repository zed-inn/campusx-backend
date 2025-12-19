import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const InstituteInterface = modelSchema({
  id: z.uuidv4("Invalid Institute Id"),
  aisheCode: z.string("Invalid Aishe Code").nullable(),
  name: z.string("Invalid Institute Name"),
  nameNormalized: z.string("Invalid Normalized Name"),
  shortName: z.string("Invalid Short Name").nullable(),
  about: z.string("Invalid About").nullable(),
  district: z.string("Invalid District").nullable(),
  state: z.string("Invalid State").nullable(),
  country: z.string("Invalid Country").nullable(),
  address: z.string("Invalid Address").nullable(),
  pinCode: z.int("Invalid Pin Code").nullable(),
  yearOfEstablishment: z.int("Invalid Year Of Establishment").nullable(),
  website: z.url("Invalid Website").nullable(),
  location: z.string("Invalid Location").nullable(),
  category: z.string("Invalid Category").nullable(),
  administrativeMinistry: z.string("Invalid Administry Ministry").nullable(),
  standaloneType: z.string("Invalid Standalone Type").nullable(),
  management: z.string("Invalid Management").nullable(),
  collegeType: z.string("Invalid College Type").nullable(),
  universityName: z.string("Invalid University Name").nullable(),
  universityType: z.string("Invalid University Type").nullable(),
  phone: z.string("Invalid Phone").nullable(),
  landline: z.string("Invalid Landline").nullable(),
  imageUrl: z.url("Invalid Image Url").nullable(),
  rating: z
    .number("Invalid Rating")
    .nonnegative("Rating cannot be negative")
    .default(0),
  ratingsCount: z.number().nonnegative().default(0),
  reviewsCount: z.number().nonnegative().default(0),
});

export type InstituteAttributes = z.infer<typeof InstituteInterface.dbSchema>;

export type InstituteCreationAttributes = Omit<
  z.infer<typeof InstituteInterface.dbFields>,
  "id" | "nameNormalized" | "rating" | "ratingsCount" | "reviewsCount"
>;
