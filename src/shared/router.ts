import { AuthRouter } from "@modules/core/authentication/auth.routes";
import { ProfileRouter } from "@modules/core/profile";
import { ForumRouter } from "@modules/features/forums";
import { Router } from "express";

const router = Router();

router.use("/", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/forums", ForumRouter);

export const AppRouter = router;
