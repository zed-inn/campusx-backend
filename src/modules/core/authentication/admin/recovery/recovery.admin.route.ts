import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { RecoveryBasicSchema } from "./dtos/recovery-action.admin.dto";
import { RecoveryController } from "./recovery.admin.controller";

const router = new DetailedRouter("Admin Recovery");

router
  .describe("Recover Account", "Reset the password of admin account")
  .body(RecoveryBasicSchema)
  .output("Password resetted.")
  .post("/reset-password", RecoveryController.resetPassword);

export const RecoveryRouter = router;
