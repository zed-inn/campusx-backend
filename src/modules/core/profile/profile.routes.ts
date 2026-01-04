import { Router } from "express";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import {
  ProfileCheckUsernameSchema,
  ProfileGetSchema,
  ProfileGetUsersSchema,
} from "./dtos/profile-get.dto";
import { ProfileController } from "./profile.controller";
import { ProfileCreateSchema } from "./dtos/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/profile-update.dto";

const router = Router();

router.get(
  "/check-username",
  ValidateReq.query(ProfileCheckUsernameSchema),
  ProfileController.checkUsername
);

router.get(
  "/",
  ValidateReq.query(ProfileGetSchema),
  ProfileController.getProfile
);

router.get(
  "/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ProfileController.getMyProfile
);

router.get(
  "/users",
  ValidateReq.query(ProfileGetUsersSchema),
  ProfileController.getUsers
);

router.post(
  "/",
  RestrictTo.loggedInUser,
  ValidateReq.body(ProfileCreateSchema),
  ProfileController.createProfile
);

router.patch(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ProfileUpdateSchema),
  ProfileController.updateProfile
);

export const ProfileRouter = mount("/profile", router);
