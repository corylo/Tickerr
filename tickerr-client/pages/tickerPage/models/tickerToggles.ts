export interface ITickerToggles {
  panel: boolean;
  wallet: boolean;
}

export const defaultTickerToggles = (): ITickerToggles => ({
  panel: window.innerWidth > 1199,
  wallet: false
});