import { Router } from "express";
import { InstituteController } from "./institute.controller";
import { mount } from "@shared/utils/mount-router";
import { ValidateReq } from "@shared/middlewares/validate-request";
import {
  InstituteGetOneSchema,
  InstituteGetPageSchema,
} from "./dtos/institute-get.dto";

const router = Router();

router.get(
  "/",
  ValidateReq.query(InstituteGetOneSchema),
  InstituteController.getInstitute
);

router.get(
  "/filter",
  ValidateReq.query(InstituteGetPageSchema),
  InstituteController.getFilteredInstitutes
);

router.get("/state", InstituteController.getCountryStateMap);

router.get("/district", InstituteController.getStateDistrictMap);

export const InstituteRouter = mount("/institute", router);
