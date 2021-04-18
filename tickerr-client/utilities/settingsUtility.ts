import { Font } from "../../tickerr-enums/font";

interface ISettingsUtility {
  getFontClass: (font: Font) => string;
}

export const SettingsUtility: ISettingsUtility = {
  getFontClass: (font: Font): string => {
    if (font === Font.Bold) {
      return "passion-one-font";
    }

    return "pt-sans-font";
  }
}