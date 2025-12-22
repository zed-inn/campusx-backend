import { Router } from "express";
import { ProfileController } from "./controllers/profile.controller";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { ProfileCreateSchema } from "./dtos/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/profile-update.dto";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { FollowController } from "./controllers/follow.controller";

const router = Router();

router.get("/", ProfileController.getProfile);

router.get("/all", ProfileController.getUserProfiles);

router.get("/me", isLoggedIn, isProfiledUser, ProfileController.getMyProfile);

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

router.get(
  "/followers",
  isLoggedIn,
  isProfiledUser,
  FollowController.getFollowers
);

router.get(
  "/followers/me",
  isLoggedIn,
  isProfiledUser,
  FollowController.getMyFollowers
);

router.get(
  "/following",
  isLoggedIn,
  isProfiledUser,
  FollowController.getFollowing
);

router.get(
  "/following/me",
  isLoggedIn,
  isProfiledUser,
  FollowController.getMyFollowing
);

router.post("/follow", isLoggedIn, isProfiledUser, FollowController.followUser);

router.post(
  "/unfollow",
  isLoggedIn,
  isProfiledUser,
  FollowController.unfollowUser
);

export const ProfileRouter = router;
