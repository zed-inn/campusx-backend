import { ValidateReq } from "@shared/middlewares/validate-request";
import { mount } from "@shared/utils/mount-router";
import { Router } from "express";
import { FollowGetMineSchema, FollowGetSchema } from "./dtos/follow-get.dto";
import { FollowController } from "./follow.controller";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { FollowActionSchema } from "./dtos/follow-create.dto";

const router = Router();

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(FollowActionSchema),
  FollowController.followUser
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(FollowActionSchema),
  FollowController.unfollowUser
);

router.get(
  "/followers",
  ValidateReq.query(FollowGetSchema),
  FollowController.getFollowers
);

router.get(
  "/followers/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(FollowGetMineSchema),
  FollowController.getMyFollowers
);

router.get(
  "/following",
  ValidateReq.query(FollowGetSchema),
  FollowController.getFollowing
);

router.get(
  "/following/me",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(FollowGetMineSchema),
  FollowController.getMyFollowing
);

export const FollowRouter = mount("/follow", router);
