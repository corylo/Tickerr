import { walletConfig } from "../../config/walletConfig";

import { IWallet } from "../../tickerr-models/wallet";

import { ApiUrl } from "../enums/url"
import { Symbol } from "../../tickerr-enums/symbol";

interface IWalletUtility {
  getAddressFormat: (symbol: string) => string;
  getAvailableWallets: () => string[];
  getBalance: (symbol: string, balance: number) => number;
  getHeaders: (symbol: string) => any;
  getUrl: (symbol: string, address: string) => string;
  getWallet: (symbol: string, wallets: IWallet[]) => IWallet | null;
  handleApiResponse: (symbol: string, address: string, data: any) => number;
  mapWallet: (wallet: IWallet, balance: number) => IWallet;
  updateAvailable: (wallet: IWallet) => boolean;
  updateWallets: (updatedWallet: IWallet, wallets: IWallet[]) => IWallet[];
}

export const WalletUtility: IWalletUtility = {
  getAddressFormat: (symbol: string): string => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return "stake";
    }

    return "";
  },
  getAvailableWallets: (): string[] => {
    return [
      Symbol.Ada,
      Symbol.Btc
    ]
  },
  getBalance: (symbol: string, balance: number): number => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return balance / 1000000;
      case Symbol.Btc:
        return balance / 100000000;
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getHeaders: (symbol: string): any => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return {
          project_id: walletConfig.api.blockfrost.project_id
        };
    }

    return {};
  },
  getUrl: (symbol: string, address: string): string => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return `${ApiUrl.BlockFrost}/accounts/${address}`;
      case Symbol.Btc:
        return `${ApiUrl.BlockChainInfo}/balance?active=${address}`;
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
  handleApiResponse: (symbol: Symbol, address: string, data: any): number => {
    switch(symbol) {
      case Symbol.Ada:
        return data.controlled_amount;
      case Symbol.Btc:
        return data[address].final_balance;
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
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

    const match: IWallet | undefined = wallets.find((wallet: IWallet) => wallet.symbol === updatedWallet.symbol);

    if(match) {
      return wallets.map((wallet: IWallet) => {
        if(wallet.symbol === updatedWallet.symbol) {
          return updatedWallet;
        }

        return wallet;
      });
    }

    return [...wallets, updatedWallet];
  }
}