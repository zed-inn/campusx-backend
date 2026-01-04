import { Router } from "express";
import { ReportRouter } from "./report/report.route";
import { mount } from "@shared/utils/mount-router";

const router = Router();

router.use("/report", ReportRouter);

// TODO: delete account endpoint and how to do it

export const UserRouter = mount("/user", router);
