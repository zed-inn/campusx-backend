import { OtpRouter } from "./otp/otp.route";
import { LoginRouter } from "./login/login.route";
import { RegisterRouter } from "./register/register.route";
import { RecoveryRouter } from "./recovery/recovery.route";
import { LogoutRouter } from "./logout/logout.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Authentication");

router.use("/otp", OtpRouter);

router.use("/login", LoginRouter);

router.use("/register", RegisterRouter);

router.use("/recovery", RecoveryRouter);

router.use("/logout", LogoutRouter);

export const AuthRouter = router;
