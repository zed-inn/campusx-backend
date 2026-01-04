import { ValidateReq } from "@shared/middlewares/validate-request";
import { Router } from "express";
import { CategoryGetPageSchema } from "./dtos/category-get.dto";
import { CategoryController } from "./category.controller";

const router = Router();

router.get(
  "/",
  ValidateReq.query(CategoryGetPageSchema),
  CategoryController.getCategories
);

export const CategoryRouter = router;
