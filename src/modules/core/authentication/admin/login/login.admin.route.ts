import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { LoginBasicSchema } from "./dtos/login-action.admin.dto";
import { AuthResponseSchema } from "@modules/core/authentication/dtos/auth-response.dto";
import { LoginController } from "./login.admin.controller";

const router = new DetailedRouter("Admin Login");

router
  .describe("Login", "Login as admin")
  .body(LoginBasicSchema)
  .output(AuthResponseSchema, "Logged in")
  .post("/", LoginController.loginBasic);

export const LoginRouter = router;
