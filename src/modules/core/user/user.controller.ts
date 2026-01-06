import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { WalletService } from "../wallet";
import { UserWalletSchema } from "./dtos/user-response.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class UserController {
  static getWallet = catchAsync(async (req: Request, res: Response) => {
    const user = AuthPayloadSchema.parse(req.user);

    const iUser = await UserService.getById(user.id);
    const iWallet = await WalletService.getByUserId(user.id);

    const responseData = UserWalletSchema.parse({
      ...iUser.plain,
      wallet: { ...iWallet.plain },
    });

    return ApiResponse.success(
      res,
      "Your referral code and wallet balance.",
      responseData
    );
  });
}
