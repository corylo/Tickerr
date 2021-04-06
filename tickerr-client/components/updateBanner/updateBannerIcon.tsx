import React from "react";

interface UpdateBannerIconProps {    
  icon: string;
}

export const UpdateBannerIcon: React.FC<UpdateBannerIconProps> = (props: UpdateBannerIconProps) => {  
  return (
    <div className="tickerr-update-banner-icon">
      <i className={props.icon} />
    </div>
  );
}