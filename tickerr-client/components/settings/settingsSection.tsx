import React from "react";
import classNames from "classnames";

interface SettingsSectionProps {
  children: any;
  className?: string;
  label: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = (
  props: SettingsSectionProps
) => {
  return (
    <div className={classNames("tickerr-settings-section", props.className)}>
      <div className="tickerr-settings-section-contents">
        {props.children}
      </div>
      <div className="tickerr-settings-section-label">
        <h1 className="passion-one-font">{props.label}</h1>
      </div>
    </div>
  )
};
