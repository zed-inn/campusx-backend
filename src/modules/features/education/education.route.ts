import { Router } from "express";
import { EducationController } from "./education.controller";
import { EducationCreateSchema } from "./dtos/education-create.dto";
import { EducationUpdateSchema } from "./dtos/education-update.dto";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

const router = Router();

router.get("/", EducationController.getUserEducation);

router.get("/students", EducationController.getInstituteStudents);

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
  EducationController.removeEducation
);

export const EducationRouter = mount("/education", router);
