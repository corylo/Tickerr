import React, { useState } from "react";
import classNames from "classnames";

interface AffiliateAdProps {
  id?: string;
  className?: string;
  src: string;
  url: string;
  closeable?: boolean;
}

export const AffiliateAd: React.FC<AffiliateAdProps> = (props: AffiliateAdProps) => {  
  const [closed, setClosed] = useState<boolean>(false);

  const getCloseButton = (): JSX.Element => {
    if(props.closeable) {
      return (
        <button type="button" className="affiliate-ad-close-button" onClick={() => setClosed(true)}>
          <i className="fal fa-times" />
        </button>
      )
    }
  }

  if(!closed) {
    return(
      <div id={props.id} className={classNames("affiliate-ad", props.className)}>
        <a className="affiliate-ad-link" href={props.url}>
          <img src={props.src} />
        </a>
        {getCloseButton()}
      </div>
    )
  }

  return null;
}