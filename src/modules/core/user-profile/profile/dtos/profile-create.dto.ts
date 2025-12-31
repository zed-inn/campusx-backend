import { z } from "zod";
import { ProfileModel } from "../profile.model";

export const CreateFullSchema = ProfileModel.dbSchema.pick({
  avatarUrl: true,
  fullName: true,
  username: true,
  about: true,
  gender: true,
  dob: true,
});

export type CreateFullDto = z.infer<typeof CreateFullSchema>;

export const CreateShortSchema = CreateFullSchema.pick({
  fullName: true,
  avatarUrl: true,
});

export type CreateShortDto = z.infer<typeof CreateShortSchema>;
