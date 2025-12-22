import { AppError } from "@shared/errors/app-error";
import { ProfileAttributes } from "../interfaces/profile.interface";
import { Profile } from "../models/profile.model";
import { ProfileCreateDto } from "../dtos/profile-create.dto";
import { ProfileUpdateDto } from "../dtos/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { Op } from "sequelize";

export class ProfileService {
  static USERS_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.USERS_PER_PAGE;

  static getById = async (id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("No User Found.", 404);

    return profile.get({ plain: true });
  };

  static getAll = async (page: number, reqUserId: string | null = null) => {
    const profiles = await Profile.findAll({
      where: { ...(reqUserId ? { id: { [Op.not]: reqUserId } } : {}) },
      offset: this.OFFSET(page),
      limit: this.USERS_PER_PAGE,
      order: [["fullName", "asc"]],
    });

    return profiles.map((p) => p.get({ plain: true }));
  };

  static getByUsername = async (username: string) => {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) throw new AppError("No User Found.", 404);

    return profile.get({ plain: true });
  };

  static create = async (data: ProfileCreateDto, id: string) => {
    const profile = await Profile.create({ ...data, id });

    return profile.get({ plain: true });
  };

  static update = async (data: ProfileUpdateDto, id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("No User Found.", 404);

    const cleanData = removeUndefined(data);
    if (Object.keys(cleanData).length)
      await profile.update(data as Partial<ProfileAttributes>);

    return profile.get({ plain: true });
  };
}
