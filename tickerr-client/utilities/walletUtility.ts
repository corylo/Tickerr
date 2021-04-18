import { walletConfig } from "../../config/walletConfig";

import { IWallet } from "../../tickerr-models/wallet";

import { URL } from "../enums/url"

interface IWalletUtility {
  getAddressFormat: (symbol: string) => string;
  getAvailableWallets: () => string[];
  getBalance: (symbol: string, balance: number) => number;
  getHeaders: (symbol: string) => any;
  getUrl: (symbol: string, address: string) => string;
  getWallet: (symbol: string, wallets: IWallet[]) => IWallet | null;
  mapWallet: (wallet: IWallet, balance: number) => IWallet;
  updateAvailable: (wallet: IWallet) => boolean;
  updateWallets: (updatedWallet: IWallet, wallets: IWallet[]) => IWallet[];
}

export const WalletUtility: IWalletUtility = {
  getAddressFormat: (symbol: string): string => {
    switch(symbol.toLowerCase()) {
      case "ada":
        return "stake";
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getAvailableWallets: (): string[] => {
    return [
      "ada"
    ]
  },
  getBalance: (symbol: string, balance: number): number => {
    switch(symbol.toLowerCase()) {
      case "ada":
        return balance / 1000000;
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getHeaders: (symbol: string): any => {
    switch(symbol.toLowerCase()) {
      case "ada":
        return {
          project_id: walletConfig.api.blockfrost.project_id
        };
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getUrl: (symbol: string, address: string): string => {
    switch(symbol.toLowerCase()) {
      case "ada":
        return `${URL.BlockFrost}/accounts/${address}`;
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getWallet: (symbol: string, wallets: IWallet[]): IWallet | null => {
    if(wallets) {
      return wallets.find((wallet: IWallet) => wallet.symbol === symbol) || null;
    }

    return null;
  },
  mapWallet: (wallet: IWallet, balance: number): IWallet => {
    return {
      ...wallet,
      balance,
      updatedAt: new Date().getTime()
    }
  },
  updateAvailable: (wallet: IWallet): boolean => {
    return new Date().getTime(), wallet.updatedAt, new Date().getTime() >= wallet.updatedAt + 30000;
  },
  updateWallets: (updatedWallet: IWallet, wallets: IWallet[]): IWallet[] => {
    if(wallets === undefined || wallets.length === 0) {
      return [updatedWallet];
    }

    return wallets.map((wallet: IWallet) => {
      if(wallet.symbol === updatedWallet.symbol) {
        return updatedWallet;
      }

      return wallet;
    });
  }
}