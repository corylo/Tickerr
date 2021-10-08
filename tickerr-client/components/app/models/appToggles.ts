export interface IAppToggles {
  search: boolean;
  settings: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  search: false,
  settings: false
});