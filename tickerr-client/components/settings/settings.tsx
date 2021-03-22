import React, { useContext, useState } from "react";
import classNames from "classnames";

import { Button } from "../buttons/button";
import { SettingsSection } from "./settingsSection";

import { AppContext } from "../app/contexts/appContext";

import { CurrencyUtility } from "../../utilities/currencyUtility";

import { UserService } from "../../services/userService";

import { IUserSettings } from "../../../tickerr-models/userSettings";

import { AppAction } from "../../enums/appAction";
import { AppStatus } from "../app/enums/appStatus";
import { currencies, Currency } from "../../../tickerr-enums/currency";
import { Font, fonts } from "../../../tickerr-enums/font";
import { RequestStatus } from "../../enums/requestStatus";

interface SettingsProps {
  
}

export const Settings: React.FC<SettingsProps> = (
  props: SettingsProps
) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  const { settings, status, user } = appState;

  const [unsavedSettings, setUnsavedSettings] = useState<IUserSettings>(settings);

  const handleSave = async () => {
    try {
      dispatch(AppAction.SetSettingsStatus, RequestStatus.Loading);
      
      if(status === AppStatus.SignedIn) {
        await UserService.update(user.uid, { settings: unsavedSettings });
      } else {
        window.localStorage.setItem("settings", JSON.stringify(unsavedSettings));
      }
      
      if(unsavedSettings.currency !== appState.settings.currency) {
        location.reload();
      } else {
        dispatch(AppAction.SetSettings, unsavedSettings);
      }
    } catch (err) {
      console.error(err);
      
      dispatch(AppAction.SetSettingsStatus, RequestStatus.Error);
    }
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
          The current price is {CurrencyUtility.formatCurrency(123456, settings.currency)}
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
      <SettingsSection className="font-options options" label="Font">
        {getFontOptions()}
      </SettingsSection>
      <Button className="save-settings-button passion-one-font" handleOnClick={handleSave}>
        Save
      </Button>
    </div>
  )
};
