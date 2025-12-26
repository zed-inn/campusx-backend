import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";

export const InstituteInterface = modelSchema({
  id: z.uuidv4("Invalid Institute Id"),
  aisheCode: z.string("Invalid Aishe Code").nullable().default(null),
  name: z.string("Invalid Institute Name"),
  nameNormalized: z.string("Invalid Normalized Name"),
  shortName: z.string("Invalid Short Name").nullable().default(null),
  about: z.string("Invalid About").nullable().default(null),
  district: z.string("Invalid District").nullable().default(null),
  state: z.string("Invalid State").nullable().default(null),
  country: z.string("Invalid Country").nullable().default(null),
  address: z.string("Invalid Address").nullable().default(null),
  pinCode: z.int("Invalid Pin Code").nullable().default(null),
  yearOfEstablishment: z
    .int("Invalid Year Of Establishment")
    .nullable()
    .default(null),
  website: z.url("Invalid Website").nullable().default(null),
  location: z.string("Invalid Location").nullable().default(null),
  category: z.string("Invalid Category").nullable().default(null),
  administrativeMinistry: z
    .string("Invalid Administry Ministry")
    .nullable()
    .default(null),
  standaloneType: z.string("Invalid Standalone Type").nullable().default(null),
  management: z.string("Invalid Management").nullable().default(null),
  collegeType: z.string("Invalid College Type").nullable().default(null),
  universityName: z.string("Invalid University Name").nullable().default(null),
  universityType: z.string("Invalid University Type").nullable().default(null),
  phone: z.string("Invalid Phone").nullable().default(null),
  landline: z.string("Invalid Landline").nullable().default(null),
  imageUrl: z.url("Invalid Image Url").nullable().default(null),
  rating: z
    .number("Invalid Rating")
    .nonnegative("Rating cannot be negative")
    .default(0),
  reviewsCount: z.number("Invalid Review Count").nonnegative().default(0),
});

export type InstituteAttributes = z.infer<typeof InstituteInterface.dbSchema>;

export type InstituteCreationAttributes = Omit<
  z.infer<typeof InstituteInterface.dbFields>,
  "id" | "nameNormalized" | "rating" | "ratingsCount" | "reviewsCount"
>;
