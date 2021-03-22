import React, { useContext } from "react";

import { Button } from "../buttons/button";
import { IconButton } from "../buttons/iconButton";
import { TickerrBrand } from "../tickerrBrand/tickerrBrand";
import { UserIcon } from "../userIcon/userIcon";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";
import { AppStatus } from "../app/enums/appStatus";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const { status, toggles, user } = appState;

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  const getSignInButton = (): JSX.Element => {
    if(status === AppStatus.SignedOut) {
      return (
        <Button 
          id="tickerr-sign-in-button" 
          className="tickerr-navbar-item passion-one-font" 
          handleOnClick={() => dispatch(AppAction.ToggleSignIn, !toggles.signIn)}
        >
          Sign In
        </Button>
      )
    }
  }

  const getLegalLink = (): JSX.Element => {
    if(status !== AppStatus.Loading) {
      return (        
        <a className="tickerr-navbar-item passion-one-font" href="https://legal.tickerr.tv">Legal</a>
      )
    }
  }

  const getUserMenuButton = (): JSX.Element => {
    if(status === AppStatus.SignedIn && user) {
      return (
        <Button id="tickerr-user-menu-button" handleOnClick={() => dispatch(AppAction.ToggleMenu, !toggles.menu)}>
          <UserIcon image={user.image} />
        </Button>
      )
    }
  }

  const getSettingsButton = (): JSX.Element => {
    if(status === AppStatus.SignedOut) {
      return (
        <IconButton 
          className="tickerr-navbar-item tickerr-navbar-button"
          icon="fad fa-cog" 
          handleOnClick={() => dispatch(AppAction.ToggleSettings, !toggles.settings)} 
        />
      )
    }
  }

  return (
    <div id="tickerr-navbar">      
      <TickerrBrand />
      <div id="tickerr-navbar-items">
        {getLegalLink()}
        {getSignInButton()}
        {getUserMenuButton()}
        {getSettingsButton()}
      </div>
    </div>
  )
}