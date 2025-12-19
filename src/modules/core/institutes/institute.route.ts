import { Router } from "express";
import { InstituteController } from "./institute.controller";

const router = Router();

router.get("/", InstituteController.getInstitute);

router.get("/all", InstituteController.getAllInstitutes);

export const InstituteRouter = router;
