import axios from "axios";

import { WalletUtility } from "../utilities/walletUtility";

interface IWalletService {
  fetchBalance: (symbol: string, address: string) => Promise<number>;
}

export const WalletService: IWalletService = {
  fetchBalance: async (symbol: string, address: string): Promise<number> => {
    const headers: any = WalletUtility.getHeaders(symbol);

    const res: any = await axios.get(WalletUtility.getUrl(symbol, address), { headers }),
      balance: number = WalletUtility.handleApiResponse(symbol, address, res.data);

    return await WalletUtility.getBalance(symbol, balance);
  }
}