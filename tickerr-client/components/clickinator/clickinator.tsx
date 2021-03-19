import React, { useState } from "react";
import classNames from "classnames";

interface ClickinatorProps {
  id?: string;
  className?: string;
  src: string;
  url: string;
  closeable?: boolean;
}

export const Clickinator: React.FC<ClickinatorProps> = (props: ClickinatorProps) => {  
  const [closed, setClosed] = useState<boolean>(false);

  const getCloseButton = (): JSX.Element => {
    if(props.closeable) {
      return (
        <button type="button" className="clickinator-close-button" onClick={() => setClosed(true)}>
          <i className="fal fa-times" />
        </button>
      )
    }
  }

  if(!closed) {
    return(
      <div id={props.id} className={classNames("clickinator", props.className)}>
        <a className="clickinator-link" href={props.url}>
          <img src={props.src} />
        </a>
        {getCloseButton()}
      </div>
    )
  }

  return null;
}