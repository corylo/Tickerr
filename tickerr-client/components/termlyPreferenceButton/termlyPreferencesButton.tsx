import React from "react";

import { Button } from "../buttons/button";

interface TermlyPreferencesButtonProps {
  
}

export const TermlyPreferencesButton: React.FC<TermlyPreferencesButtonProps> = (
  props: TermlyPreferencesButtonProps
) => {
  const handleOnClick = (): void => {
    { //@ts-ignore
      window.displayPreferenceModal();
    }
  }

  return (
    <Button className="termly-cookie-preference-button passion-one-font" handleOnClick={handleOnClick}>      
      Cookies
    </Button>    
  )
};
