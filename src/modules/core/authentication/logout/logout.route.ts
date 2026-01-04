import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { Router } from "express";
import { LogoutController } from "./logout.controller";

const router = Router();

router.get("/", RestrictTo.loggedInUser, LogoutController.logout);

export const LogoutRouter = router;
