import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { ReactActionSchema } from "./dtos/reaction.dto";
import { ReactionController } from "./reaction.controller";

const router = Router();

router.post(
  "/like",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(ReactActionSchema),
  ReactionController.likePost
);

router.delete(
  "/like",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.query(ReactActionSchema),
  ReactionController.unlikePost
);

export const ReactionRouter = router;
