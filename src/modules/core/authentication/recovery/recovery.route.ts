import { RecoverPasswordSchema } from "./dtos/recovery.dto";
import { RecoveryController } from "./recovery.controller";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Account Recovery");

router
  .describe(
    "Recover password : Basic Account",
    "Reset password of an account with password after getting and verifying otp"
  )
  .body(RecoverPasswordSchema)
  .output("Password resetted.")
  .post("/basic", RecoveryController.resetPasswordBasic);

export const RecoveryRouter = router;
