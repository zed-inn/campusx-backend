import { Router } from "express";
import { ProfileController } from "./controllers/profile.controller";
import { ProfileCreateSchema } from "./dtos/service/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/service/profile-update.dto";
import { FollowController } from "./controllers/follow.controller";
import { ReportController } from "./controllers/report.controller";
import { mount } from "@shared/utils/mount-router";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

const router = Router();

router.get("/profile", ProfileController.getProfile);

router.get("/all", ProfileController.getUsers);

router.get(
  "/profile/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ProfileController.getMyProfile
);

router.post(
  "/profile",
  RestrictTo.loggedInUser,
  ValidateReq.body(ProfileCreateSchema),
  ProfileController.createProfile
);

router.put(
  "/profile",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ProfileUpdateSchema),
  ProfileController.updateProfile
);

router.get("/followers", FollowController.getFollowers);

router.get(
  "/followers/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  FollowController.getMyFollowers
);

router.get("/following", FollowController.getFollowing);

router.get(
  "/following/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  FollowController.getMyFollowing
);

router.post(
  "/follow",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  FollowController.followUser
);

router.post(
  "/unfollow",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  FollowController.unfollowUser
);

router.post(
  "/report",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ReportController.reportUser
);

export const ProfileRouter = mount("/user", router);
