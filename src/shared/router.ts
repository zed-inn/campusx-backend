import { AuthRouter } from "@modules/core/authentication/auth.routes";
import { ProfileRouter } from "@modules/core/profile";
import { Router } from "express";

const router = Router();

router.use("/", AuthRouter);
router.use("/profile", ProfileRouter);

export const AppRouter = router;
