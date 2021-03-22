import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { auth } from "../../firebase";

import { Button } from "../buttons/button";
import { UserIcon } from "../userIcon/userIcon";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";

interface UserMenuProps {
  
}

export const UserMenu: React.FC<UserMenuProps> = (props: UserMenuProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const { toggles, user } = appState;

  if(toggles.menu) {
    const handleSignOut = (): void => {
      dispatch(AppAction.ToggleMenu, false);

      auth.signOut();
    }

    return ReactDOM.createPortal(
      <div id="tickerr-user-menu">
        <UserIcon image={user.image} />
        <div id="tickerr-user-menu-content">
          <div className="tickerr-user-full-name">
            <h1 className="passion-one-font">{user.name}</h1>
          </div>
          <Button className="tickerr-user-menu-item passion-one-font" handleOnClick={() => dispatch(AppAction.ToggleSettings, !toggles.settings)}>
            Settings
          </Button>
          <Button id="tickerr-sign-out-button" className="tickerr-user-menu-item passion-one-font" handleOnClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>,
      document.body
    )
  }

  return null;
}