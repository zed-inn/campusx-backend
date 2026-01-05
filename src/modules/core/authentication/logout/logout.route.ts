import { LogoutController } from "./logout.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Logout");

router
  .describe("Logout", "logout")
  .auth()
  .output("Logged out.")
  .get("/", LogoutController.logout);

export const LogoutRouter = router;
