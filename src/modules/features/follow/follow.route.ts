import { FollowGetMineSchema, FollowGetSchema } from "./dtos/follow-get.dto";
import { FollowController } from "./follow.controller";
import { FollowActionSchema } from "./dtos/follow-create.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { array } from "zod";
import { ShortUserSchema } from "@modules/core/profile";

const router = new DetailedRouter("Follow");

router
  .describe(
    "Follow User",
    "Start following a target user to see their updates."
  )
  .userProfiled()
  .body(FollowActionSchema)
  .output("Followed.")
  .post("/", FollowController.followUser);

router
  .describe("Unfollow User", "Stop following a target user.")
  .userProfiled()
  .query(FollowActionSchema)
  .output("Unfollowed")
  .delete("/", FollowController.unfollowUser);

router
  .describe(
    "Get Followers",
    "Retrieve a paginated list of followers for a specific user."
  )
  .query(FollowGetSchema)
  .output("followers", array(ShortUserSchema), "User's followers.")
  .get("/followers", FollowController.getFollowers);

router
  .describe(
    "Get My Followers",
    "Retrieve a paginated list of the current user's followers."
  )
  .userProfiled()
  .query(FollowGetMineSchema)
  .output("followers", array(ShortUserSchema), "Your followers.")
  .get("/followers/me", FollowController.getMyFollowers);

router
  .describe(
    "Get Following",
    "Retrieve a list of users that a specific user is following."
  )
  .query(FollowGetSchema)
  .output("following", array(ShortUserSchema), "User's following.")
  .get("/following", FollowController.getFollowing);

router
  .describe(
    "Get My Following",
    "Retrieve the list of users the current user is following."
  )
  .userProfiled()
  .query(FollowGetMineSchema)
  .output("following", array(ShortUserSchema), "Your following.")
  .get("/following/me", FollowController.getMyFollowing);

export const FollowRouter = router;
