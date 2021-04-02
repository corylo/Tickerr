export interface IAppToggles {
  cya: boolean;
  menu: boolean;
  settings: boolean;
  signIn: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  cya: false,
  menu: false,
  settings: false,
  signIn: false
});