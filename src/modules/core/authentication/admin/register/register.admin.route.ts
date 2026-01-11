import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { AuthResponseSchema } from "@modules/core/authentication/dtos/auth-response.dto";
import { RegisterCreateBasicSchema } from "./dtos/register-action.admin.dto";
import { RegisterController } from "./register.admin.controller";

const router = new DetailedRouter("Admin Register");

router
  .describe("Register", "Register as admin")
  .body(RegisterCreateBasicSchema)
  .output(AuthResponseSchema, "Registered as admin.")
  .post("/", RegisterController.registerBasic);

export const RegisterRouter = router;
