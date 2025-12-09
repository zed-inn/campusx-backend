import { Profile } from "./profile.model";
import { ProfileCreateDto } from "./dtos/profile-create.dto";
import { AppError } from "@shared/errors/app-error";
import db from "@config/database";
import { ProfileUpdateDto } from "./dtos/profile-update.dto";
import { removeUndefined } from "@shared/utils/clean-object";
import { ProfileAttributes } from "./profile.interface";
import { v4 as uuidv4 } from "uuid";
import { PROFILE } from "./profile.config";
import { User } from "../user";

export class ProfileService {
  static getProfileByID = async (id: string): Promise<ProfileAttributes> => {
    const profile = await Profile.findByPk(id);
    if (!profile) throw new AppError("No user found", 404);

    return profile.get({ plain: true });
  };

  static getProfileByUsername = async (
    username: string
  ): Promise<ProfileAttributes> => {
    const profile = await Profile.findOne({ where: { username } });
    if (!profile) throw new AppError("No user found", 404);

    return profile.get({ plain: true });
  };

  static createProfile = async (
    data: ProfileCreateDto,
    id: string
  ): Promise<ProfileAttributes> => {
    return await db.transaction(async (t) => {
      const existingProfile = data.username
        ? await Profile.findOne({ where: { username: data.username } })
        : null;
      if (existingProfile)
        throw new AppError("Username is already taken.", 409);

      // TODO: referralCode creation
      let referralCode = uuidv4()
        .replace("-", "")
        .substring(0, PROFILE.REFERRAL_CODE_LENGTH);
      while (await Profile.findOne({ where: { referralCode } }))
        referralCode = uuidv4()
          .replace("-", "")
          .substring(0, PROFILE.REFERRAL_CODE_LENGTH);

      const createData = { ...data, referralCode, id };

      const profile = await Profile.create(createData);
      await User.update({ profiled: true }, { where: { id } });

      return profile.get({ plain: true });
    });
  };

  static updateProfile = async (
    data: ProfileUpdateDto,
    id: string
  ): Promise<ProfileAttributes> => {
    return await db.transaction(async (t) => {
      const profile = await Profile.findByPk(id);
      if (!profile) throw new AppError("User not found.", 404);

      const cleanData = removeUndefined(data);

      await profile.update(cleanData as Partial<ProfileAttributes>);
      return profile.get({ plain: true });
    });
  };
}
