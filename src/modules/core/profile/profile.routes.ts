import { Router } from "express";
import { ProfileController } from "./controllers/profile.controller";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { ProfileCreateSchema } from "./dtos/service/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/service/profile-update.dto";
import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { FollowController } from "./controllers/follow.controller";
import { ReportController } from "./controllers/report.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get("/profile", ProfileController.getProfile);

router.get("/all", ProfileController.getUsers);

router.get(
  "/profile/me",
  isLoggedIn,
  isProfiledUser,
  ProfileController.getMyProfile
);

router.post(
  "/profile",
  isLoggedIn,
  validateRequestBody(ProfileCreateSchema),
  ProfileController.createProfile
);

router.put(
  "/profile",
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

router.post("/report", isLoggedIn, isProfiledUser, ReportController.reportUser);

export const ProfileRouter = mount("/user", router);
