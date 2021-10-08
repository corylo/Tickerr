import React, { useContext } from "react";

import { IconButton } from "../buttons/iconButton";
import { SearchBar } from "../searchBar/searchBar";
import { TickerrBrand } from "../tickerrBrand/tickerrBrand";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../../enums/appAction";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const { toggles } = appState;

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

  return (
    <div id="tickerr-navbar">      
      <TickerrBrand />
      <SearchBar />
      <div id="tickerr-navbar-items">
        {getToggleSearchButton()}
        <IconButton 
          id="tickerr-user-menu-button"
          icon="far fa-ellipsis-h" 
          handleOnClick={() => dispatch(AppAction.ToggleSettings, true)} 
        />
      </div>
    </div>
  )
}