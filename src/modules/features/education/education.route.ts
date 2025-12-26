import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { Router } from "express";
import { EducationController } from "./education.controller";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { EducationCreateSchema } from "./dtos/service/education-create.dto";
import { EducationUpdateSchema } from "./dtos/service/education-update.dto";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get("/", EducationController.getUserEducation);

router.get("/students", EducationController.getInstituteStudents);

router.post(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(EducationCreateSchema),
  EducationController.addEducation
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(EducationUpdateSchema),
  EducationController.updateEducation
);

router.delete(
  "/",
  isLoggedIn,
  isProfiledUser,
  EducationController.removeEducation
);

export const ProfileEducationRouter = mount("/education", router);
