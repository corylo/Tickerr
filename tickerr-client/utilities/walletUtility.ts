import { walletConfig } from "../../config/walletConfig";

import { TickerUtility } from "./tickerUtility";

import { ITicker } from "../../tickerr-models/ticker";
import { IWallet } from "../../tickerr-models/wallet";

import { ApiUrl } from "../enums/url"
import { Symbol } from "../../tickerr-enums/symbol";

interface IWalletUtility {
  getAddressFormat: (symbol: string) => string;
  getAvailableWallets: () => string[];
  getBalance: (symbol: string, balance: number) => number;
  getCombinedValue: (wallets: IWallet[], tickers: ITicker[]) => number;
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
      Symbol.Btc,
      Symbol.Eth,
      Symbol.Erg
    ]
  },
  getBalance: (symbol: string, balance: number): number => {
    switch(symbol.toLowerCase()) {
      case Symbol.Ada:
        return balance / Math.pow(10, 6);
      case Symbol.Btc:
        return balance / Math.pow(10, 8);
      case Symbol.Erg:
        return balance / Math.pow(10, 9);
      case Symbol.Eth:
        return balance / Math.pow(10, 19);
      default:
        console.error(`Symbol ${symbol} not found.`);
    }
  },
  getCombinedValue: (wallets: IWallet[], tickers: ITicker[]): number => {
    return wallets.reduce((previous: any, current: IWallet) => {
      const ticker: ITicker = TickerUtility.getTickerBySymbol(current.symbol, tickers);

      return ticker 
        ? previous + (ticker.price * current.balance)
        : previous;
    }, 0);
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
      case Symbol.Erg:
        return `${ApiUrl.ErgoExplorer}/api/v0/addresses/${address}`;
      case Symbol.Eth:
        return `${ApiUrl.EtherScan}?module=account&action=balance&address=${address}`;
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
      case Symbol.Erg:
        return data.transactions.confirmedBalance;
      case Symbol.Eth:
        return data.result;
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