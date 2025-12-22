import { z } from "zod";
import { modelSchema } from "@shared/utils/model-schema";
import { InstituteInterface } from "@modules/core/institutes";
import { ProfileInterface } from "@modules/core/profile";

export const EducationInterface = modelSchema(
  {
    id: z.uuidv4("Invalid Education Id"),
    userId: z.uuidv4("Invalid User Id"),
    instituteId: z.uuidv4("Invalid Institute Id"),
    startYear: z.int("Invalid Start Year").positive("Invalid Start Year"),
    startMonth: z
      .int("Invalid Start Month")
      .min(1, { error: "Invalid Start Month" })
      .max(12, { error: "Invalid Start Month" }),
    endYear: z.int("Invalid End Year").positive("Invalid End Year").nullable(),
    endMonth: z
      .int("Invalid End Month")
      .min(1, { error: "Invalid End Month" })
      .max(12, { error: "Invalid End Month" })
      .nullable(),
    isCompleted: z.boolean("Invalid Complete Status"),
  },
  {
    institute: z.object({
      id: InstituteInterface.fields.id,
      name: InstituteInterface.fields.name,
      aisheCode: InstituteInterface.fields.aisheCode,
      shortName: InstituteInterface.fields.shortName,
      about: InstituteInterface.fields.about,
      district: InstituteInterface.fields.district,
      state: InstituteInterface.fields.state,
      country: InstituteInterface.fields.country,
      yearOfEstablishment: InstituteInterface.fields.yearOfEstablishment,
      website: InstituteInterface.fields.website,
      imageUrl: InstituteInterface.fields.imageUrl,
      category: InstituteInterface.fields.category,
    }),
    user: z.object({
      id: ProfileInterface.fields.id,
      fullName: ProfileInterface.fields.fullName,
      username: ProfileInterface.fields.username,
      avatarUrl: ProfileInterface.fields.avatarUrl,
      isFollowed: ProfileInterface.extra.fields.isFollowed,
    }),
  }
);

export type EducationAttributes = z.infer<typeof EducationInterface.dbSchema>;

export type EducationCreationAttributes = Omit<
  z.infer<typeof EducationInterface.dbFields>,
  "id"
>;
