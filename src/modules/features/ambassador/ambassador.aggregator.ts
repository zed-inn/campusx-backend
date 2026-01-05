import { InstituteService } from "@modules/core/institutes";
import { AmbassadorAttributes } from "./ambassador.model";
import { AmbassadorSchema } from "./dtos/ambassador-response.dto";

export type IncompleteAmbassador = AmbassadorAttributes & {
  institute?: Record<string, unknown>;
};

export class AmbassadorAggregator {
  static addInstitute = async (requests: IncompleteAmbassador[]) => {
    const instituteIds = requests.map((r) => r.instituteId);

    const institutes = await InstituteService.getByIds(instituteIds);
    const instituteMap: Record<string, any> = {};
    institutes.map((i) => (instituteMap[i.id] = i));

    return requests.map((r) => ({
      ...r,
      institute: instituteMap[r.instituteId],
    }));
  };

  static transform = async (requests: IncompleteAmbassador[]) => {
    const withInstitutes = await AmbassadorAggregator.addInstitute(requests);

    return withInstitutes.map((r) => AmbassadorSchema.parse(r));
  };
}
