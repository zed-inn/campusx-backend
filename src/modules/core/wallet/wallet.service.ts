import { BaseService } from "@shared/services/base.service";
import { Wallet, WalletInstance } from "./wallet.model";

class _WalletService extends BaseService<WalletInstance> {
  constructor() {
    super(Wallet);
  }

  getByUserId = async (userId: string) => {
    try {
      return await this.getById(userId);
    } catch {
      return await this.create({ id: userId });
    }
  };

  updateBalanceByUserId = async (amount: number, userId: string) => {
    if (amount === 0) return;

    const wallet = await this.getByUserId(userId);
    const balance = wallet.plain.balance;
    const newBalance = balance + amount;
    if (newBalance < 0) return;

    await wallet.update({ balance: newBalance });
  };
}

export const WalletService = new _WalletService();
