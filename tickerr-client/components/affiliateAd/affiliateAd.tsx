import React from "react";
import classNames from "classnames";

interface AffiliateAdProps {
  id?: string;
  className?: string;
  src: string;
  url: string;
}

export const AffiliateAd: React.FC<AffiliateAdProps> = (props: AffiliateAdProps) => {  
  return(
    <div id={props.id} className={classNames("affiliate-ad", props.className)}>
      <a className="affiliate-ad-link" href={props.url}>
        <img src={props.src} />
      </a>
    </div>
  )
}