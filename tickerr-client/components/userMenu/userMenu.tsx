import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { auth } from "../../firebase";

import { Button } from "../buttons/button";
import { UserIcon } from "../userIcon/userIcon";
import { TermlyPreferencesButton } from "../termlyPreferenceButton/termlyPreferencesButton";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";
import { AppStatus } from "../app/enums/appStatus";

interface UserMenuProps {
  
}

export const UserMenu: React.FC<UserMenuProps> = (props: UserMenuProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const { toggles, user } = appState;

  if(toggles.menu) {
    const handleSignOut = async () => {
      try {
        dispatch(AppAction.StartSignOutUser);
        
        await auth.signOut();
        
        dispatch(AppAction.SignOutUser);
      } catch (err) {
        console.error(err);
      }
    }

    const getUserIcon = (): JSX.Element => {
      if(user) {
        return (
          <UserIcon image={user.image} />
        )
      }
    }

    const getUserFullName = (): JSX.Element => {
      if(user) {
        return (
          <div className="tickerr-user-full-name">
            <h1 className="passion-one-font">{user.name}</h1>
          </div>
        )
      }
    }

    const getSignOutButton = (): JSX.Element => {
      if(user) {
        return (          
          <Button id="tickerr-sign-out-button" className="tickerr-user-menu-item passion-one-font" handleOnClick={handleSignOut}>
            Sign Out
          </Button>
        )
      }
    }

    return ReactDOM.createPortal(
      <div id="tickerr-user-menu" className={classNames("scroll-bar", { "signed-in": appState.status === AppStatus.SignedIn, "signed-out": appState.status === AppStatus.SignedOut })}>
        {getUserIcon()}
        <div id="tickerr-user-menu-content">
          {getUserFullName()}
          <Button className="tickerr-user-menu-item passion-one-font" handleOnClick={() => dispatch(AppAction.ToggleSettings, !toggles.settings)}>
            Settings
          </Button>
          <TermlyPreferencesButton />
          <Button className="tickerr-user-menu-item passion-one-font" url="https://legal.tickerr.tv">
            Legal
          </Button>
          {getSignOutButton()}
        </div>
      </div>,
      document.body
    )
  }

  return null;
}