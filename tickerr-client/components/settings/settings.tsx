import React, { useContext } from "react";
import classNames from "classnames";

import { Button } from "../buttons/button";
import { SettingsSection } from "./settingsSection";

import { AppContext } from "../app/contexts/appContext";

import { CurrencyUtility } from "../../utilities/currencyUtility";

import { IUserSettings } from "../../../tickerr-models/userSettings";

import { currencies, Currency } from "../../../tickerr-enums/currency";
import { Font, fonts } from "../../../tickerr-enums/font";

interface SettingsProps {
  unsavedSettings: IUserSettings;
  setUnsavedSettings: (settings: IUserSettings) => void;
}

export const Settings: React.FC<SettingsProps> = (
  props: SettingsProps
) => {
  const { appState } = useContext(AppContext);

  const { settings } = appState;

  const getFontOptions = (): JSX.Element[] => {
    const setFont = (font: Font): void => {
      props.setUnsavedSettings({ ...props.unsavedSettings, font });
    }

    return fonts.map((font: Font) => {
      const selected: boolean = font === props.unsavedSettings.font,
        classes: string = classNames("option", font.toLowerCase(), { selected });

      return (
        <Button key={font} className={classes} handleOnClick={() => setFont(font)}>
          The current price is {CurrencyUtility.formatCurrency(123456, settings.currency)}
        </Button>
      )
    });
  }

  const getCurrencyOptions = (): JSX.Element[] => {
    const setCurrency = (currency: Currency): void => {
      props.setUnsavedSettings({ ...props.unsavedSettings, currency });
    }

    return currencies.map((currency: Currency) => {
      const selected: boolean = currency === props.unsavedSettings.currency,
        classes: string = classNames("option", "passion-one-font", { selected });

      return (
        <Button key={currency} className={classes} handleOnClick={() => setCurrency(currency)}>
          {currency}
        </Button>
      )
    });
  }

  return (
    <div id="tickerr-settings">
      <SettingsSection className="currency-options options" label="Currency">
        {getCurrencyOptions()}
      </SettingsSection>
      <SettingsSection className="font-options options" label="Font">
        {getFontOptions()}
      </SettingsSection>
    </div>
  )
};
