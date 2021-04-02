export interface IAccountStateToggles {
  deletion: boolean;
}

export const defaultAccountStateToggles = (): IAccountStateToggles => ({
  deletion: false
});