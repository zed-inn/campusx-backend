import { DetailedRouter } from "@shared/infra/http/detailed-router";
import { InstituteGetFilterSchema } from "./dtos/institute-get.admin.dto";
import { array } from "zod";
import { InstituteSchema } from "./dtos/institute-response.admin.dto";
import { InstituteController } from "./institute.admin.controller";
import {
  InstituteCreateSchema,
  InstituteDeleteSchema,
  InstituteUpdateSchema,
} from "./dtos/institute-action.admin.dto";
import { InsightSchema } from "@shared/migration/mapping/data-old.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Institute");

router
  .describe("Get Institutes", "Get institutes by filter")
  .admin()
  .body(InstituteGetFilterSchema)
  .output("institutes", array(InstituteSchema), "Institutes fetched.")
  .get("/", InstituteController.getInstitutesByFilter);

router
  .describe("Create institute", "Create institute")
  .admin()
  .body(InstituteCreateSchema)
  .output("institute", InstituteSchema, "Institute created.")
  .post("/", InstituteController.createInstitute);

router
  .describe("Update institute", "Update institute by Id")
  .admin()
  .body(InstituteUpdateSchema)
  .output("institute", InsightSchema, "Institute updated.")
  .patch("/", InstituteController.updateInstitute);

router
  .describe("Delete institute", "Delete institute by Id")
  .admin()
  .query(InstituteDeleteSchema)
  .output(GlobalDeleteSchema)
  .delete("/", InstituteController.deleteInstitute);

export const InstituteAdminRouter = router;
