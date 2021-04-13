import React, { useContext } from "react";

import { Button } from "../buttons/button";
import { IconButton } from "../buttons/iconButton";
import { SearchBar } from "../searchBar/searchBar";
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

  const getToggleSearchButton = (): JSX.Element => {
    if(!toggles.search) {
      return (        
        <IconButton
          id="tickerr-toggle-search-button"
          className="tickerr-navbar-item"
          icon="far fa-search"
          handleOnClick={() => dispatch(AppAction.ToggleSearch, true)}
        />
      )
    }
  }

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

  const getUserMenuButton = (): JSX.Element => {
    if(status === AppStatus.SignedIn && user) {
      return (
        <Button id="tickerr-user-menu-button" handleOnClick={() => dispatch(AppAction.ToggleMenu, !toggles.menu)}>
          <UserIcon image={user.image} />
        </Button>
      )
    } else if (status !== AppStatus.Loading) {
      return (
        <IconButton 
          id="tickerr-user-menu-button"
          icon="far fa-ellipsis-h" 
          handleOnClick={() => dispatch(AppAction.ToggleMenu, !toggles.menu)} 
        />
      )
    }
  }

  return (
    <div id="tickerr-navbar">      
      <TickerrBrand />
      <SearchBar />
      <div id="tickerr-navbar-items">
        {getToggleSearchButton()}
        {getSignInButton()}
        {getUserMenuButton()}
      </div>
    </div>
  )
}