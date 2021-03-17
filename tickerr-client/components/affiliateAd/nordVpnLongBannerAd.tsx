import React from "react";

import { AffiliateAd } from "./affiliateAd";

import { AffiliateLink } from "../../enums/affiliateLink";

interface NordVpnLongBannerAdProps {
  closeable?: boolean;
}

export const NordVpnLongBannerAd: React.FC<NordVpnLongBannerAdProps> = (props: NordVpnLongBannerAdProps) => {  
  return(
    <AffiliateAd
      className="nord_vpn-affiliate-ad" 
      src={"/img/affiliates/nord_vpn/nord_vpn_long_banner.png"} 
      url={AffiliateLink.NordVPN}
      closeable={props.closeable}
    />
  )
}