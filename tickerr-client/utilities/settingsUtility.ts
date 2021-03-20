import { Font } from "../enums/font";

interface ISettingsUtility {
  getFontClass: (font: Font) => string;
}

export const SettingsUtility: ISettingsUtility = {
  getFontClass: (font: Font): string => {
    if(font === Font.Awesome) {
      return "bangers-font";
    } else if (font === Font.Bold) {
      return "passion-one-font";
    }

    return "open-sans-condensed";
  }
}