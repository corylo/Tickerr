import React from "react";

import { TickerrBrand } from "../tickerrBrand/tickerrBrand";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <div id="tickerr-navbar">      
      <TickerrBrand />
    </div>
  )
}