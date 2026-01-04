import { Router } from "express";
import { EducationController } from "./education.controller";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import {
  EducationGetMineSchema,
  EducationGetStudentsSchema,
  EducationGetUserSchema,
} from "./dtos/education-get.dto";
import {
  EducationCreateSchema,
  EducationDeleteSchema,
  EducationUpdateSchema,
} from "./dtos/education-action.dto";

const router = Router();

router.get(
  "/",
  ValidateReq.query(EducationGetUserSchema),
  EducationController.getUserEducation
);

router.get(
  "/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(EducationGetMineSchema),
  EducationController.getUserEducation
);

router.get(
  "/students",
  ValidateReq.query(EducationGetStudentsSchema),
  EducationController.getInstituteStudents
);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(EducationCreateSchema),
  EducationController.addEducation
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(EducationUpdateSchema),
  EducationController.updateEducation
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(EducationDeleteSchema),
  EducationController.removeEducation
);

export const EducationRouter = mount("/education", router);
