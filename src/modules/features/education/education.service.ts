import {
  Education,
  EducationAttributes,
  EducationInstance,
} from "./education.model";
import { removeUndefined } from "@shared/utils/clean-object";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { INSTITUTES_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import {
  EducationCreateDto,
  EducationCreateOneDto,
  EducationUpdateDto,
} from "./dtos/education-action.dto";
import db from "@config/database";

class _EducationService extends BaseService<EducationInstance> {
  protected OFFSET = createOffsetFn(INSTITUTES_PER_PAGE);

  constructor() {
    super(Education);
  }

  add = async (data: EducationCreateOneDto, userId: string) => {
    return await this.create({ ...data, userId });
  };

  getByUserId = async (userId: string, page: number) => {
    const educations = await Education.findAll({
      where: { userId },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["endYear", "desc"]],
    });

    return educations.map((e) => e.plain);
  };

  getUserIdsByInstituteId = async (id: string, page: number) => {
    const educations = await Education.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["endYear", "desc"]],
    });

    return educations.map((e: any) => e.userId as string);
  };

  isUserEnrolled = async (userId: string, instituteId: string) => {
    const education = await Education.findOne({
      where: { userId, instituteId },
    });
    return education ? true : false;
  };

  update = async (data: EducationUpdateDto, userId: string) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const edu = await this.getById(id);
      this.checkOwnership(edu, userId);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await edu.update(cleanData as Partial<EducationAttributes>);

      return edu;
    });
  };
}

export const EducationService = new _EducationService();
