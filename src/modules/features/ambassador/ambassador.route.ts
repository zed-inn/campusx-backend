import { mount } from "@shared/utils/mount-router";
import { Router } from "express";
import { AmbassadorController } from "./ambassador.controller";
import { RestrictTo } from "@shared/middlewares/auth-restrict";

const router = Router();

router.get("/", AmbassadorController.getInstituteAmbassadors);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.requestForAmbassadorPosition
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.updateRequest
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  AmbassadorController.deleteRequest
);

export const AmbassadorRouter = mount("/ambassador", router);
