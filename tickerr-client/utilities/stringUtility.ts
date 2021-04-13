interface IStringUtility {
  format: (value: string) => string;
}

export const StringUtility: IStringUtility = {
  format: (value: string): string => {
    return value.replace(/\s+/g, '').toLowerCase();
  }
}