import React, { useContext, useState } from "react";
import classNames from "classnames";

import { Button } from "../buttons/button";
import { SettingsSection } from "./settingsSection";

import { AppContext } from "../app/contexts/appContext";

import { IAppSettings } from "../app/models/appSettings";

import { currencies, Currency } from "../../enums/currency";
import { Font, fonts } from "../../enums/font";

interface SettingsProps {
  
}

export const Settings: React.FC<SettingsProps> = (
  props: SettingsProps
) => {
  const { appState } = useContext(AppContext);

  const [unsavedSettings, setUnsavedSettings] = useState<IAppSettings>(appState.settings);

  const handleSave = (): void => {
    window.localStorage.setItem("settings", JSON.stringify(unsavedSettings));

    setTimeout(() => location.reload(), 10);
  }

  const getFontOptions = (): JSX.Element[] => {
    const setFont = (font: Font): void => {
      setUnsavedSettings({ ...unsavedSettings, font });
    }

    return fonts.map((font: Font) => {
      const selected: boolean = font === unsavedSettings.font,
        classes: string = classNames("option", font.toLowerCase(), { selected });

      return (
        <Button key={font} className={classes} handleOnClick={() => setFont(font)}>
          {font}
        </Button>
      )
    });
  }

  const getCurrencyOptions = (): JSX.Element[] => {
    const setCurrency = (currency: Currency): void => {
      setUnsavedSettings({ ...unsavedSettings, currency });
    }

    return currencies.map((currency: Currency) => {
      const selected: boolean = currency === unsavedSettings.currency,
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
      <SettingsSection className="currency-options options" label="Font">
        {getFontOptions()}
      </SettingsSection>
      <Button className="save-settings-button passion-one-font" handleOnClick={handleSave}>
        Save
      </Button>
    </div>
  )
};
