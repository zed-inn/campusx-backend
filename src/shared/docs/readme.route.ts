import { mount } from "@shared/utils/mount-router";
import { Router } from "express";
import { createDocs } from "./readme-create";

const router = Router();

router.get("/create", (_, res) => {
  createDocs();
  res.send("Docs Created");
});

export const DocsRouter = mount("/docs", router);
