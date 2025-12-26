import { ProfileAttributes } from "../interfaces/profile.interface";
import { Profile } from "../models/profile.model";
import { ProfileCreateDto } from "../dtos/service/profile-create.dto";
import { ProfileUpdateDto } from "../dtos/service/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { Includeable, Op } from "sequelize";
import { Follow } from "../models/follow.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Rui } from "@shared/dtos/req-user.dto";
import { UserErrors } from "@modules/core/user";
import { ProfileSchema } from "../dtos/service/profile-schema.dto";
import { BaseService } from "@shared/services/base.service";

export class ProfileService extends BaseService<InstanceType<typeof Profile>> {
  protected static USERS_PER_PAGE = 30;
  protected static offset = createOffsetFn(this.USERS_PER_PAGE);

  override get data() {
    const profile = super.data;
    return ProfileService.parse(profile);
  }

  static parse = (profile: any) => {
    profile.isFollowed =
      Array.isArray(profile.followers) && profile.followers.length;
    return ProfileSchema.parse(profile);
  };

  static create = async (data: ProfileCreateDto, userId: string) => {
    const profile = await Profile.create({ ...data, id: userId });

    return new ProfileService(profile);
  };

  static getById = async (id: string, reqUserId?: Rui) => {
    const profile = await Profile.findByPk(id, {
      include: [ProfileInclude.followedBy(reqUserId)],
    });
    if (!profile) throw UserErrors.noUserFound;

    return new ProfileService(profile);
  };

  static getByUsername = async (username: string, reqUserId?: Rui) => {
    const profile = await Profile.findOne({
      where: { username },
      include: [ProfileInclude.followedBy(reqUserId)],
    });
    if (!profile) throw UserErrors.noUserFound;

    return new ProfileService(profile);
  };

  static getAll = async (page: number, reqUserId?: Rui) => {
    const profiles = await Profile.findAll({
      where: { ...(reqUserId ? { id: { [Op.not]: reqUserId } } : {}) },
      offset: this.offset(page),
      limit: this.USERS_PER_PAGE,
      order: [["fullName", "asc"]],
      include: [ProfileInclude.followedBy(reqUserId)],
    });

    return profiles.map((p) => new ProfileService(p));
  };

  static update = async (data: ProfileUpdateDto, userId: string) => {
    const service = await ProfileService.getById(userId);

    const profile = service.model;
    const cleanData = removeUndefined(data);
    if (Object.keys(cleanData).length)
      await profile.update(cleanData as Partial<ProfileAttributes>);

    return new ProfileService(profile);
  };
}

export class ProfileInclude {
  static followedBy = (id: Rui = null): Includeable => ({
    model: Follow,
    where: { followerId: id },
    required: false,
    as: "followers",
  });
}
