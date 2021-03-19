import React from "react";

import { Clickinator } from "./clickinator";

import { ClickinatorLink } from "../../enums/clickinatorLink";

interface NVpnClickinatorProps {
  closeable?: boolean;
}

export const NVpnClickinator: React.FC<NVpnClickinatorProps> = (props: NVpnClickinatorProps) => {  
  return(
    <Clickinator
      className="nvpn-clickinator" 
      src={"/img/clickinators/nvpn/long_banner.png"} 
      url={ClickinatorLink.NVPN}
      closeable={props.closeable}
    />
  )
}