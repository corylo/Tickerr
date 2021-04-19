export interface IAppToggles {
  cya: boolean;
  donation: boolean;
  menu: boolean;
  search: boolean;
  settings: boolean;
  signIn: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  cya: false,
  donation: false,
  menu: false,
  search: false,
  settings: false,
  signIn: false
});