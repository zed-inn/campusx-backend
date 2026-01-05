import { RegisterBasicSchema, RegisterGoogleSchema } from "./dtos/register.dto";
import { RegisterController } from "./register.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { AuthResponseSchema } from "../dtos/auth-response.dto";

const router = new DetailedRouter("Register/Signup");

router
  .describe("Register basic", "Register using email and password")
  .body(RegisterBasicSchema)
  .output(AuthResponseSchema, "Registration successfull.")
  .post("/basic", RegisterController.registerBasic);

router
  .describe("Register Google", "Register with google mail")
  .body(RegisterGoogleSchema)
  .output(AuthResponseSchema, "Registration successfull.")
  .post("/google", RegisterController.registerGoogle);

export const RegisterRouter = router;
