import React from "react";

interface UpdateBannerProps {    
  children: any;
}

export const UpdateBanner: React.FC<UpdateBannerProps> = (props: UpdateBannerProps) => {  
  return (
    <div className="tickerr-update-banner">
      {props.children}
    </div>
  );
}