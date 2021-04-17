export interface IWallet {
  address: string;
  balance: number;
  symbol: string;
}

export const defaultWallet = (): IWallet => ({
  address: "",
  balance: 0,
  symbol: ""
});