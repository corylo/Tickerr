import React, { useContext } from "react";

import { Button } from "../../components/buttons/button";

import { AppAction } from "../../enums/appAction";
import { AppContext } from "../../components/app/contexts/appContext";

interface DonationButtonProps {
  
}

export const DonationButton: React.FC<DonationButtonProps> = (props: DonationButtonProps) => {
  const { dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });
  
  return(
    <Button className="tickerr-donation-toggle-button" handleOnClick={() => dispatch(AppAction.ToggleDonation, true)}>
      <i className="fad fa-donate" />
      <h1 className="passion-one-font">Donate</h1>
    </Button>
  )
}