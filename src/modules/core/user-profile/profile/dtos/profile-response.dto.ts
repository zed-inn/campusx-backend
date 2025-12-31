import { z } from "zod";
import { ProfileModel } from "../profile.model";
import { InstituteResponseSmall } from "@modules/core/institutes";

export const ResponseFullSchema = ProfileModel.dbSchema.extend({
  isFollowed: z.boolean("Invalid isFollowed").default(false),
  isAmbassador: z.boolean("Invalid isAmbassador").default(false),
  ambassadorInstitute: InstituteResponseSmall.nullable().default(null),
});

export type ResponseFullDto = z.infer<typeof ResponseFullSchema>;

export const ResponseShortSchema = ResponseFullSchema.pick({
  isFollowed: true,
  id: true,
  username: true,
  fullName: true,
  avatarUrl: true,
});

export type ResponseShortDto = z.infer<typeof ResponseShortSchema>;
