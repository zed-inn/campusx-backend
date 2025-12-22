import { z } from "zod";
import { ForumInterface } from "../interfaces/forum.interface";
import { ProfileInterface } from "@modules/core/profile";

export const ForumFullSchema = ForumInterface.dbSchema.extend({
  writer: ProfileInterface.dbSchema.extend({
    ...ProfileInterface.extra.fields,
  }),
  isLiked: ForumInterface.extra.fields.isLiked,
});

export type ForumFullAttributes = z.infer<typeof ForumFullSchema>;
