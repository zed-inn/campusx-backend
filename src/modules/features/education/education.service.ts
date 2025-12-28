import { Institute, InstituteService } from "@modules/core/institutes";
import { Includeable } from "sequelize";
import { Education, EducationInstance } from "./education.model";
import { Profile, ProfileInclude, ProfileService } from "@modules/core/profile";
import { EducationCreateDto } from "./dtos/service/education-create.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { EducationAttributes } from "./education.interface";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { EducationErrors } from "./education.errros";
import { Rui } from "@shared/dtos/req-user.dto";
import { EducationSchema } from "./dtos/service/education-schema.dto";
import { EducationUpdateDto } from "./dtos/service/education-update.dto";

export class EducationService extends BaseService<EducationInstance> {
  static EDUCATIONS_PER_PAGE = 30;
  static OFFSET = createOffsetFn(this.EDUCATIONS_PER_PAGE);

  override get data() {
    const edu = super.data;
    edu.user = ProfileService.parse(edu.user);
    edu.institute = InstituteService.parse(edu.institute);

    return EducationSchema.parse(edu);
  }

  static create = async (data: EducationCreateDto, userId: string) => {
    const education = await Education.create({ ...data, userId });

    return this.getById(education.dataValues.id);
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const education = await Education.findByPk(id, {
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });
    if (!education) throw EducationErrors.noEducationFound;

    return new EducationService(education);
  };

  static getByUserId = async (id: string, page: number, reqUserId?: Rui) => {
    const educations = await Education.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: this.EDUCATIONS_PER_PAGE,
      order: [["endYear", "desc"]],
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });

    return educations.map((e) => new EducationService(e));
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId?: Rui
  ) => {
    const educations = await Education.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.EDUCATIONS_PER_PAGE,
      order: [["endYear", "desc"]],
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });

    return educations.map((e) => new EducationService(e));
  };

  static update = async (data: EducationUpdateDto, userId: string) => {
    const { id, ...updateData } = data;

    const service = await this.getById(id);
    service.checkOwnership(userId);

    const education = service.model;
    const cleanData = removeUndefined(updateData);
    if (Object.keys(cleanData).length)
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

class EducationInclude {
  static user(userId?: Rui): Includeable {
    return {
      model: Profile,
      as: "user",
      include: [ProfileInclude.followedBy(userId), ProfileInclude.ambassador],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}
