import { Institute, InstituteService } from "@modules/core/institutes";
import { Includeable, Model } from "sequelize";
import { Education } from "./education.model";
import { AppError } from "@shared/errors/app-error";
import { EducationFullSchema } from "./dtos/education-full.dto";
import {
  Profile,
  ProfileInclude,
  ProfileService,
  ProfileUtils,
} from "@modules/core/profile";
import { EducationCreateDto } from "./dtos/education-create.dto";
import { EducationUpdateDto } from "./dtos/education-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { EducationAttributes } from "./education.interface";
import { getModel } from "@shared/utils/check-instance";

export class EducationService {
  static EDUCATIONS_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.EDUCATIONS_PER_PAGE;

  static parse = (edu: any) => EducationUtils.process(getModel(edu));

  static getById = async (id: string, reqUserId: string | null = null) => {
    const education = await Education.findByPk(id, {
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });
    if (!education) throw new AppError("No Education Found.", 404);

    return this.parse(education);
  };

  static getByUserId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
  ) => {
    const educations = await Education.findAll({
      where: { userId: id },
      offset: this.OFFSET(page),
      limit: this.EDUCATIONS_PER_PAGE,
      order: [["endYear", "desc"]],
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });

    return educations.map((e) => this.parse(e));
  };

  static getByInstituteId = async (
    id: string,
    page: number,
    reqUserId: string | null = null
  ) => {
    const educations = await Education.findAll({
      where: { instituteId: id },
      offset: this.OFFSET(page),
      limit: this.EDUCATIONS_PER_PAGE,
      order: [["endYear", "desc"]],
      include: [EducationInclude.institute, EducationInclude.user(reqUserId)],
    });

    return educations.map((e) => this.parse(e));
  };

  static create = async (data: EducationCreateDto, userId: string) => {
    const education = await Education.create({ ...data, userId });

    const institute = await InstituteService.getById(data.instituteId);
    const user = await ProfileService.getById(userId);

    return this.parse({ ...education.get({ plain: true }), institute, user });
  };

  static update = async (data: EducationUpdateDto, userId: string) => {
    const { id, ...updateData } = data;

    const education = await Education.findOne({
      where: { id, userId },
      include: [EducationInclude.institute, EducationInclude.user()],
    });
    if (!education) throw new AppError("No Education Found.", 404);

    const cleanData = removeUndefined(updateData);

    if (Object.keys(cleanData).length)
      await education.update(cleanData as Partial<EducationAttributes>);

    return this.parse(education);
  };

  static delete = async (id: string, userId: string) => {
    const education = await Education.findOne({
      where: { id, userId },
      include: [EducationInclude.institute, EducationInclude.user()],
    });
    if (!education) throw new AppError("No Education Found.", 404);

    await education.destroy();

    return this.parse(education);
  };
}

class EducationInclude {
  static user(userId: string | null = null): Includeable {
    return {
      model: Profile,
      as: "user",
      include: [ProfileInclude.isFollowing(userId)],
    };
  }

  static get institute(): Includeable {
    return { model: Institute, as: "institute" };
  }
}

class EducationUtils {
  static process = (education: any) => {
    education.user = ProfileUtils.process(education.user);

    return EducationFullSchema.parse(education);
  };
}
