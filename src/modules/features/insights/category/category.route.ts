import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { CategoryGetPageSchema } from "./dtos/category-get.dto";
import { CategoryController } from "./category.controller";
import { array, string } from "zod";

const router = new DetailedRouter("Insight Categories");

router
  .describe(
    "Get Categories",
    "Retrieve a paginated list of available forum categories."
  )
  .query(CategoryGetPageSchema)
  .output("categories", array(string()), "Categories fetched.")
  .get("/", CategoryController.getCategories);

export const CategoryRouter = router;
