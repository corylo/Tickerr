import React from "react";

interface UpdateBannerBodyProps {    
  children: any;
}

export const UpdateBannerBody: React.FC<UpdateBannerBodyProps> = (props: UpdateBannerBodyProps) => {  
  return (
    <div className="tickerr-update-banner-body passion-one-font">
      {props.children}
    </div>
  );
}