import { EducationController } from "./education.controller";
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
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { EducationSchema } from "./dtos/education-response.dto";
import { ShortUserSchema } from "@modules/core/profile";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("User Education");

router
  .describe("Get user's education", "Get education for a specific user")
  .query(EducationGetUserSchema)
  .output("educations", array(EducationSchema), "User's education.")
  .get("/", EducationController.getUserEducation);

router
  .describe("Get my education", "Get education for the current logged in user")
  .userProfiled()
  .query(EducationGetMineSchema)
  .output("educations", array(EducationSchema), "User's education.")
  .get("/me", EducationController.getUserEducation);

router
  .describe("Get user's education", "Get education for a specific user")
  .query(EducationGetStudentsSchema)
  .output("students", array(ShortUserSchema), "Institute's students.")
  .get("/students", EducationController.getInstituteStudents);

router
  .describe("Add Education", "Add education")
  .userProfiled()
  .body(EducationCreateSchema)
  .output("education", EducationSchema, "Education added.")
  .post("/", EducationController.addEducation);

router
  .describe("Add Education", "Add education")
  .userProfiled()
  .body(EducationUpdateSchema)
  .output("education", EducationSchema, "Education updated.")
  .put("/", EducationController.updateEducation);

router
  .describe("Add Education", "Add education")
  .userProfiled()
  .query(EducationDeleteSchema)
  .output(GlobalDeleteSchema, "Education removed.")
  .delete("/", EducationController.removeEducation);

export const EducationRouter = router;
