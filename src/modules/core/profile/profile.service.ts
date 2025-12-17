import { AppError } from "@shared/errors/app-error";
import { ProfileAttributes } from "./profile.interface";
import { Profile } from "./profile.model";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";

export class ProfileService {
  static getById = async (id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("No user found.", 404);

    return profile.get({ plain: true });
  };

  static getByUsername = async (username: string) => {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) throw new AppError("No user found.", 404);

    return profile.get({ plain: true });
  };

  static create = async (data: ProfileCreateDto, id: string) => {
    const profile = await Profile.create({ ...data, id });

    return profile.get({ plain: true });
  };

  static update = async (data: ProfileUpdateDto, id: string) => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("User not found.", 404);

    await profile.update(data as Partial<ProfileAttributes>);
    return profile.get({ plain: true });
  };
}
