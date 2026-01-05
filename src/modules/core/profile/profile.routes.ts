import {
  ProfileCheckUsernameSchema,
  ProfileGetSchema,
  ProfileGetUsersSchema,
} from "./dtos/profile-get.dto";
import { ProfileController } from "./profile.controller";
import { ProfileCreateSchema } from "./dtos/profile-create.dto";
import { ProfileUpdateSchema } from "./dtos/profile-update.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { UserSchema } from "./dtos/profile-response.dto";
import { array } from "zod";

const router = new DetailedRouter("User Profile");

router
  .describe("Check username", "Check if a username is available or not")
  .query(ProfileCheckUsernameSchema)
  .output("Username available.")
  .get("/check-username", ProfileController.checkUsername);

router
  .describe("Get user's profile", "Get a specific user's profile")
  .query(ProfileGetSchema)
  .output("user", UserSchema, "Profile fetched.")
  .get("/", ProfileController.getProfile);

router
  .describe("Get my profile", "Get the profile of the current logged in user")
  .userProfiled()
  .output("user", UserSchema, "Profile fetched.")
  .get("/me", ProfileController.getMyProfile);

router
  .describe("Get users", "Get short profiles of recommended/random users")
  .query(ProfileGetUsersSchema)
  .output("users", array(UserSchema), "Users fetched.")
  .get("/users", ProfileController.getUsers);

router
  .describe(
    "Create profile",
    "Create profile for the current logged in user after registering"
  )
  .auth()
  .body(ProfileCreateSchema)
  .output("user", UserSchema, "Profile created.")
  .post("/", ProfileController.createProfile);

router
  .describe(
    "Update profile",
    "Update any field of profile, remaining other unaffected"
  )
  .userProfiled()
  .body(ProfileUpdateSchema)
  .output("user", UserSchema, "Profile updated.")
  .patch("/", ProfileController.updateProfile);

export const ProfileRouter = router;
