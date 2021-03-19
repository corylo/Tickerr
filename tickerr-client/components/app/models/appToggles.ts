export interface IAppToggles {
  settings: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  settings: false
});