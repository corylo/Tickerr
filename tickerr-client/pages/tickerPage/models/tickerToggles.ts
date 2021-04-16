export interface ITickerToggles {
  panel: boolean;
}

export const defaultTickerToggles = (): ITickerToggles => ({
  panel: window.innerWidth > 1199
});