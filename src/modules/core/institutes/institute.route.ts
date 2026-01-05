import { InstituteController } from "./institute.controller";
import {
  InstituteGetOneSchema,
  InstituteGetPageSchema,
} from "./dtos/institute-get.dto";
import { DetailedRouter } from "@shared/infra/http/detailed-router";
import {
  InstituteSchema,
  ShortInstituteSchema,
} from "./dtos/institute-response.dto";
import { array, z } from "zod";

const router = new DetailedRouter("Institute");

router
  .describe("Get institute", "Get details of a specific institute")
  .query(InstituteGetOneSchema)
  .output("institute", InstituteSchema, "Institute fetched.")
  .get("/", InstituteController.getInstitute);

router
  .describe("Get institutes", "Get short institutes with")
  .query(InstituteGetPageSchema)
  .output("institutes", array(ShortInstituteSchema), "Institutes fetched.")
  .get("/filter", InstituteController.getFilteredInstitutes);

router
  .describe(
    "Get Map: country-state",
    "Get country state map in format {country: state}[]"
  )
  .output("states", array(z.record(z.string(), z.string())), "States fetched.")
  .get("/state", InstituteController.getCountryStateMap);

router
  .describe(
    "Get Map: state-district",
    "Get state district map in format {state: disctrict}[]"
  )
  .output(
    "states",
    array(z.record(z.string(), z.string())),
    "Districts fetched."
  )
  .get("/district", InstituteController.getStateDistrictMap);

export const InstituteRouter = router;
