import React from "react";

interface PageMessageProps {  
  children: any;
}

export const PageMessage: React.FC<PageMessageProps> = (props: PageMessageProps) => {  
  return (
    <div className="tickerr-page-message">
      {props.children}
    </div>
  );
}