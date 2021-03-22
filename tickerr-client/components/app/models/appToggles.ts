export interface IAppToggles {
  menu: boolean;
  settings: boolean;
  signIn: boolean;
}

export const defaultAppToggles = (): IAppToggles => ({
  menu: false,
  settings: false,
  signIn: false
});