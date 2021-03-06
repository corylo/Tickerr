import React from "react";
import classNames from "classnames";

import { IconButton } from "../buttons/iconButton";

interface ModalTitleProps {  
  text?: string;
  children?: any;
  handleOnClose?: () => void;
}

export const ModalTitle: React.FC<ModalTitleProps> = (props: ModalTitleProps) => {
  const getChildren = (): any => {
    if(props.children) {
      return props.children;
    }
  }

  const getText = (): JSX.Element => {
    if(props.text) {
      return (
        <h1 className="passion-one-font">{props.text}</h1>
      )
    }
  }

  const getCloseButton = (): JSX.Element => {
    if(props.handleOnClose) {
      return (
        <IconButton 
          className="close-button"
          icon="fal fa-times" 
          handleOnClick={props.handleOnClose} 
        />
      )
    }
  }

  return (
    <div className={classNames("tickerr-modal-title", { "with-close-button": props.handleOnClose !== undefined })}>
      {getText()}
      {getChildren()}
      {getCloseButton()}
    </div>
  );
}