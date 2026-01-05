import { InstituteService } from "@modules/core/institutes";
import { RequestSchema } from "./dtos/request-response.dto";
import { RequestAttributes } from "./request.model";

export type IncompleteRequest = RequestAttributes & {
  institute?: Record<string, unknown>;
};

export class RequestAggregator {
  static addInstitute = async (requests: IncompleteRequest[]) => {
    const instituteIds = requests.map((r) => r.instituteId);

    const institutes = await InstituteService.getByIds(instituteIds);
    const instituteMap: Record<string, any> = {};
    institutes.map((i) => (instituteMap[i.id] = i));

    return requests.map((r) => ({
      ...r,
      institute: instituteMap[r.instituteId],
    }));
  };

  static transform = async (requests: IncompleteRequest[]) => {
    const withInstitutes = await RequestAggregator.addInstitute(requests);

    return withInstitutes.map((r) => RequestSchema.parse(r));
  };
}
