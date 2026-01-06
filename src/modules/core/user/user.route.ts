import { ReportRouter } from "./report/report.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { UserController } from "./user.controller";
import { UserWalletSchema } from "./dtos/user-response.dto";

const router = new DetailedRouter("User");

router.use("/report", ReportRouter);

router
  .describe(
    "Get Wallet Info",
    "Get the referral Code and the wallet balance of the current logged in user"
  )
  .auth()
  .output(UserWalletSchema, "Your referral code and wallet balance.")
  .get("/wallet/me", UserController.getWallet);

// TODO: delete account endpoint and how to do it

export const UserRouter = router;
