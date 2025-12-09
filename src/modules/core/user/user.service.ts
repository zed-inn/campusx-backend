import bcrypt from "bcryptjs";
import { Profile } from "@modules/core/profile";
import { env } from "@config/env";
import { AppError } from "@shared/errors/app-error";
import db from "@config/database";
import { UserAttributes } from "./user.interface";
import { User } from "./user.model";
import { UserCreateDto } from "./dtos/user-create";
import { UpdatePasswordDto } from "./dtos/update-password";

export class UserService {
  static getUserByEmail = async (email: string): Promise<UserAttributes> => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AppError("Invalid email, No user found.", 404);

    return user.get({ plain: true });
  };

  static getUserByID = async (id: string): Promise<UserAttributes> => {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("No user found.", 404);

    return user.get({ plain: true });
  };

  static getUserByProfileUsername = async (
    username: string
  ): Promise<UserAttributes> => {
    return await db.transaction(async (t) => {
      const profile = await Profile.findOne({ where: { username } });
      if (!profile) throw new AppError("Invalid username, No user found", 404);

      const user = await User.findByPk(profile.dataValues.id);
      if (!user) throw new AppError("Invalid username, No user found.", 404);

      return user.get({ plain: true });
    });
  };

  static createUser = async (data: UserCreateDto): Promise<UserAttributes> => {
    return await db.transaction(async (t) => {
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) throw new AppError("Email is already in use.", 409);

      const passwordHash = data.password
        ? await bcrypt.hash(data.password, env.BCRYPT_PASSWORD_HASH_SALT)
        : null;

      const user = await User.create({ email: data.email, passwordHash });
      return user.get({ plain: true });
    });
  };

  static updatePasswordByEmail = async (
    data: UpdatePasswordDto
  ): Promise<UserAttributes> => {
    return await db.transaction(async (t) => {
      const user = await User.findOne({ where: { email: data.email } });
      if (!user)
        throw new AppError("No account found with that email address.", 404);

      const passwordHash = await bcrypt.hash(
        data.password,
        env.BCRYPT_PASSWORD_HASH_SALT
      );

      await user.update({ passwordHash });
      return user.get({ plain: true });
    });
  };
}
