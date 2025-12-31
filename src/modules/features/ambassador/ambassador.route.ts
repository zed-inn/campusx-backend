import { mount } from "@shared/utils/mount-router";
import { Router } from "express";
import { AmbassadorController } from "./ambassador.controller";
import { RestrictTo } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get(
  "/request",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.getCurrentRequest
);

router.get("/institute", AmbassadorController.getInstituteAmbassadors);

router.post(
  "/request",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.requestForAmbassadorPosition
);

router.put(
  "/request",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.updateRequest
);

router.delete(
  "/request",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.deleteRequest
);

export const AmbassadorRouter = mount("/ambassador", router);
