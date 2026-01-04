import { InstituteService } from "@modules/core/institutes";
import { EducationAttributes } from "./education.model";
import { EducationSchema } from "./dtos/education-response.dto";

export type IncompleteEducation = EducationAttributes & {
  institute?: Record<string, unknown>;
};

export class EducationAggregator {
  static addInstitute = async (educations: IncompleteEducation[]) => {
    const instituteIds = educations.map((e) => e.instituteId);

    const institutes = await InstituteService.getByIds(instituteIds);
    const instituteMap: Record<string, any> = {};
    institutes.map((i) => (instituteMap[i.id] = i));

    return educations.map((e) => ({
      ...e,
      institute: instituteMap[e.instituteId],
    }));
  };

  static transform = async (educations: IncompleteEducation[]) => {
    const withInstitute = await EducationAggregator.addInstitute(educations);

    return withInstitute.map((e) => EducationSchema.parse(e));
  };
}
