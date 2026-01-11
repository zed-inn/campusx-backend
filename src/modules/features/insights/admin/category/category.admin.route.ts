import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { CategoryGetFilterSchema } from "./dtos/category-get.admin.dto";
import { array } from "zod";
import { CategorySchema } from "./dtos/category-response.admin.dto";
import { CategoryController } from "./category.admin.controller";
import {
  CategoryCreateSchema,
  CategoryDeleteSchema,
  CategoryUpdateSchema,
} from "./dtos/category-action.admin.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Insights Category");

router
  .describe("Get Categories", "Get categories by filter")
  .admin()
  .query(CategoryGetFilterSchema)
  .output("categories", array(CategorySchema), "Categories fetched.")
  .get("/", CategoryController.getCategoriesByFilters);

router
  .describe("Create category", "Create category")
  .admin()
  .body(CategoryCreateSchema)
  .output("category", CategorySchema, "Category created.")
  .post("/", CategoryController.createCategory);

router
  .describe("Update category", "Update category by Id")
  .admin()
  .body(CategoryUpdateSchema)
  .output("category", CategorySchema, "Category updated.")
  .patch("/", CategoryController.updateCategory);

router
  .describe("Delete category", "Delete category by Id")
  .admin()
  .query(CategoryDeleteSchema)
  .output(GlobalDeleteSchema, "Category deleted.")
  .delete("/", CategoryController.deleteCategory);

export const CategoryRouter = router;
