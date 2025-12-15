import bcrypt from "bcryptjs";
import { env } from "@config/env";
import { AppError } from "@shared/errors/app-error";
import { User } from "./user.model";
import { UserCreateDto } from "./dtos/user-create";
import { UpdatePasswordDto } from "./dtos/update-password";

class UserUtils {
  static hashPassword = async (password: string) =>
    await bcrypt.hash(password, env.BCRYPT_PASSWORD_HASH_SALT);
}

export class UserService {
  static getById = async (id: string) => {
    const user = await User.findByPk(id);
    if (!user) throw new AppError("No user found.", 404);

    return user.get({ plain: true });
  };

  static getByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new AppError("No user found.", 404);

    return user.get({ plain: true });
  };

  static create = async (data: UserCreateDto) => {
    const passwordHash = await UserUtils.hashPassword(data.password);
    const user = await User.create({ email: data.email, passwordHash });

    return user.get({ plain: true });
  };

  static updatePasswordByEmail = async (data: UpdatePasswordDto) => {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) throw new AppError("No user found.", 404);

    const passwordHash = await UserUtils.hashPassword(data.password);
    await user.update({ passwordHash });

    return user.get({ plain: true });
  };
}
