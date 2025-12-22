import { AppError } from "@shared/errors/app-error";
import { ProfileAttributes } from "../interfaces/profile.interface";
import { Profile } from "../models/profile.model";
import { ProfileCreateDto } from "../dtos/profile-create.dto";
import { ProfileUpdateDto } from "../dtos/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { Op } from "sequelize";
import { Follow } from "../models/follow.model";
import { ProfileFullSchema } from "../dtos/profile-full.dto";

export class ProfileService {
  static USERS_PER_PAGE = 30;
  static OFFSET = (page: number) => (page - 1) * this.USERS_PER_PAGE;

  static parse = (profile: any) =>
    ProfileUtils.process(profile.get({ plain: true }));

  static getById = async (id: string, reqUserId: string | null = null) => {
    const profile = await Profile.findByPk(id, {
      include: [ProfileInclude.isFollowing(reqUserId)],
    });
    if (!profile) throw new AppError("No User Found.", 404);

    return this.parse(profile);
  };

  static getAll = async (page: number, reqUserId: string | null = null) => {
    const profiles = await Profile.findAll({
      where: { ...(reqUserId ? { id: { [Op.not]: reqUserId } } : {}) },
      offset: this.OFFSET(page),
      limit: this.USERS_PER_PAGE,
      order: [["fullName", "asc"]],
      include: [ProfileInclude.isFollowing(reqUserId)],
    });

    return profiles.map((p) => this.parse(p));
  };

  static getByUsername = async (
    username: string,
    reqUserId: string | null = null
  ) => {
    const profile = await Profile.findOne({
      where: { username },
      include: [ProfileInclude.isFollowing(reqUserId)],
    });
    if (!profile) throw new AppError("No User Found.", 404);

    return this.parse(profile);
  };

  static create = async (data: ProfileCreateDto, id: string) => {
    const profile = await Profile.create({ ...data, id });

    return this.parse(profile);
  };

  static update = async (data: ProfileUpdateDto, id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("No User Found.", 404);

    const cleanData = removeUndefined(data);
    if (Object.keys(cleanData).length)
      await profile.update(data as Partial<ProfileAttributes>);

    return this.parse(profile);
  };
}

export class ProfileInclude {
  static isFollowing = (userId: string | null = null) => {
    {
      return {
        model: Follow,
        where: { followerId: userId },
        required: false,
        as: "followers",
      };
    }
  };
}

export class ProfileUtils {
  static process = (profile: any) => {
    if (Array.isArray(profile.followers) && profile.followers.length)
      profile.isFollowed = true;
    return ProfileFullSchema.parse(profile);
  };
}
