import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { LoginRouter } from "./login/login.admin.route";
import { RegisterRouter } from "./register/register.admin.route";
import { RecoveryRouter } from "./recovery/recovery.admin.route";

const router = new DetailedRouter("Admin Authentication");

router.use("/register", RegisterRouter);

router.use("/login", LoginRouter);

router.use("/recovery", RecoveryRouter);

export const AuthAdminRouter = router;
