import { Router } from "express";
import { InstituteController } from "./institute.controller";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.get("/", InstituteController.getInstitute);

router.get("/all", InstituteController.getAllInstitutes);

router.get("/all/random", InstituteController.getAllInstitutesRandom);

export const InstituteRouter = mount("/institute", router);
