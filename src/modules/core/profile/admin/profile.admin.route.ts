import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { ProfileGetFilterSchema } from "./dtos/profile-get.admin.dto";
import { array } from "zod";
import { ProfileSchema } from "./dtos/profile-response.admin.dto";
import { ProfileController } from "./profile.admin.controller";

const router = new DetailedRouter("Profile");

router
  .describe("Get users", "Get users by profile")
  .admin()
  .query(ProfileGetFilterSchema)
  .output("users", array(ProfileSchema), "Users fetched.")
  .get("/", ProfileController.getUsersByFilters);

export const ProfileAdminRouter = router;
