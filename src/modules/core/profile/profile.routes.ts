import { Router } from "express";
import { ProfileController } from "./profile.controller";
import { validateRequest } from "@shared/middlewares/validate-request";
import { ProfileCreateSchema } from "./dtos/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/profile-update.dto";
import {
  isLoggedIn,
  isUserNotProfiled,
  isUserProfiled,
} from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", ProfileController.getProfile);

router.get("/me", isLoggedIn, isUserProfiled, ProfileController.getMyProfile);

router.post(
  "/",
  isLoggedIn,
  isUserNotProfiled,
  validateRequest(ProfileCreateSchema),
  ProfileController.createProfile
);

router.put(
  "/",
  isLoggedIn,
  isUserProfiled,
  validateRequest(ProfileUpdateSchema),
  ProfileController.updateProfile
);

export const ProfileRouter = router;
