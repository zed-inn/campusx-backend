import { AuthResponseSchema } from "../dtos/auth-response.dto";
import { LoginBasicSchema, LoginGoogleSchema } from "./dtos/login.dto";
import { LoginController } from "./login.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Login");

router
  .describe("Login Basic", "Login with email and password")
  .body(LoginBasicSchema)
  .output(AuthResponseSchema, "Logged in.")
  .post("/basic", LoginController.loginWithPassword);

router
  .describe("Login Google", "Login with google mail")
  .body(LoginGoogleSchema)
  .output(AuthResponseSchema, "Logged in.")
  .post("/google", LoginController.loginWithGoogle);

export const LoginRouter = router;
