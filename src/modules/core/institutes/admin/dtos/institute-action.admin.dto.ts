import { z } from "zod";
import { InstituteModel } from "../../institute.model";

export const InstituteCreateSchema = InstituteModel.dbFields.omit({
  id: true,
  nameNormalized: true,
  rating: true,
  reviewsCount: true,
});

export type InstituteCreateDto = z.infer<typeof InstituteCreateSchema>;

export const InstituteUpdateSchema = InstituteModel.dbFields
  .omit({
    id: true,
    nameNormalized: true,
    rating: true,
    reviewsCount: true,
  })
  .partial()
  .extend({ id: InstituteModel.fields.id });

export type InstituteUpdateDto = z.infer<typeof InstituteUpdateSchema>;

export const InstituteDeleteSchema = InstituteModel.dbSchema.pick({ id: true });

export type InstituteDeleteDto = z.infer<typeof InstituteDeleteSchema>;
