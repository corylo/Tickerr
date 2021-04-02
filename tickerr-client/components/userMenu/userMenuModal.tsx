import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { auth } from "../../firebase";

import { Button } from "../buttons/button";
import { UserIcon } from "../userIcon/userIcon";
import { TermlyPreferencesButton } from "../termlyPreferenceButton/termlyPreferencesButton";

import { AppContext } from "../app/contexts/appContext";

import { useOnClickAwayEffect } from "../../effects/appEffects";

import { AppAction } from "../../enums/appAction";
import { AppStatus } from "../app/enums/appStatus";

interface UserMenuModalProps {
  
}

export const UserMenuModal: React.FC<UserMenuModalProps> = (props: UserMenuModalProps) => {  
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const { toggles, user } = appState;

  useOnClickAwayEffect(
    toggles.menu, 
    ["tickerr-user-menu", "tickerr-user-menu-button"], 
    [toggles.menu], 
    () => dispatch(AppAction.ToggleMenu, false)
  );

  if(toggles.menu) {
    const handleSignOut = async () => {
      try {
        dispatch(AppAction.StartSignOutUser);
        
        await auth.signOut();
        
        location.reload();
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

    const getAccountButton = (): JSX.Element => {
      if(user) {
        return (          
          <Button className="tickerr-user-menu-item passion-one-font" url="/account" handleOnClick={() => dispatch(AppAction.ToggleMenu, false)}>
            Account
          </Button>
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
          {getAccountButton()}
          <Button className="tickerr-user-menu-item passion-one-font" handleOnClick={() => dispatch(AppAction.ToggleSettings, !toggles.settings)}>
            Settings
          </Button>
          <TermlyPreferencesButton />
          <Button className="tickerr-user-menu-item passion-one-font" url="https://legal.tickerr.tv" external>
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