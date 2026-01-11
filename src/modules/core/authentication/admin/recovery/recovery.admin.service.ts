import { env } from "@config/env";
import { RecoveryBasicDto } from "./dtos/recovery-action.admin.dto";
import { AppError } from "@shared/errors/app-error";
import { UserService } from "@modules/core/user";

export class RecoveryService {
  static basic = async (data: RecoveryBasicDto) => {
    if (data.adminCode !== env.ADMIN_CODE) throw new AppError("Forbidden", 403);

    await UserService.updatePasswordByEmail({
      email: data.email,
      password: data.password,
    });
  };
}
