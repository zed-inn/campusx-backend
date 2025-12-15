import { Router } from "express";
import { ProfileController } from "./profile.controller";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { ProfileCreateSchema } from "./dtos/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/profile-update.dto";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", ProfileController.getProfile);

router.get("/me", isLoggedIn, isProfiledUser, ProfileController.getMyProfile);

router.get(
  "/referral-code",
  isLoggedIn,
  isProfiledUser,
  ProfileController.getMyReferralCode
);

router.post(
  "/",
  isLoggedIn,
  validateRequestBody(ProfileCreateSchema),
  ProfileController.createProfile
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(ProfileUpdateSchema),
  ProfileController.updateProfile
);

export const ProfileRouter = router;
