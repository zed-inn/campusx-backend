import {
  Education,
  EducationAttributes,
  EducationInstance,
} from "./education.model";
import { removeUndefined } from "@shared/utils/clean-object";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { EducationErrors } from "./education.errros";
import { INSTITUTES_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import { EducationCreateDto } from "./dtos/education-create.dto";
import { EducationUpdateDto } from "./dtos/education-update.dto";

export class EducationService extends BaseService<
  EducationInstance,
  EducationAttributes
> {
  static OFFSET = createOffsetFn(INSTITUTES_PER_PAGE);

  static create = async (data: EducationCreateDto, userId: string) => {
    const education = await Education.create({ ...data, userId });

    return this.getById(education.dataValues.id);
  };

  static userInInstitute = async (userId: string, instituteId: string) => {
    const education = await Education.findOne({
      where: { userId, instituteId },
    });
    return education ? true : false;
  };

  static getById = async (id: string) => {
    const education = await Education.findByPk(id);
    if (!education) throw EducationErrors.noEducationFound;

    return new EducationService(education);
  };

  static getByUserId = async (id: string, page: number) => {
    const educations = await Education.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["endYear", "desc"]],
    });

    return educations.map((e) => new EducationService(e));
  };

  static getByInstituteId = async (id: string, page: number) => {
    const educations = await Education.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: INSTITUTES_PER_PAGE,
      order: [["endYear", "desc"]],
    });

    return educations.map((e) => new EducationService(e));
  };

  static update = async (data: EducationUpdateDto, userId: string) => {
    const { id, ...updateData } = data;

    const service = await this.getById(id);
    service.checkOwnership(userId);

    const education = service.model;
    const cleanData = removeUndefined(updateData);
    if (hasKeys(cleanData))
      await education.update(cleanData as Partial<EducationAttributes>);

    return new EducationService(education);
  };

  static delete = async (id: string, userId: string) => {
    const service = await this.getById(id);
    service.checkOwnership(userId);

    const education = service.model;
    await education.destroy();

    return new EducationService(education);
  };
}
