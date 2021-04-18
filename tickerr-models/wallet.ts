export interface IWallet {
  address: string;
  balance: number;
  updatedAt: number;
  symbol: string;
}

export const defaultWallet = (): IWallet => ({
  address: "",
  balance: 0,
  updatedAt: 0,
  symbol: ""
});