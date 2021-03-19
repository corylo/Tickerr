import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "../buttons/iconButton";
import { TickerrBrand } from "../tickerrBrand/tickerrBrand";

import { AppContext } from "../app/contexts/appContext";

import { AppAction } from "../app/enums/appAction";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { appState, dispatchToApp } = useContext(AppContext);

  const dispatch = (type: AppAction, payload?: any): void => dispatchToApp({ type, payload });

  return (
    <div id="tickerr-navbar">      
      <TickerrBrand />
      <div id="tickerr-navbar-items">
        <Link to="/legal" className="tickerr-navbar-item passion-one-font">Legal</Link>
        <IconButton 
          className="tickerr-navbar-item tickerr-navbar-button"
          icon="fad fa-cog" 
          handleOnClick={() => dispatch(AppAction.ToggleSettings, !appState.toggles.settings)} 
        />
      </div>
    </div>
  )
}