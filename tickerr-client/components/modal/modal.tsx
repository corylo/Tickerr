import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import { LoadingIcon } from "../loadingIcon/loadingIcon";

import { RequestStatus } from "../../enums/requestStatus";

interface ModalProps {
  id: string;
  children: any;
  transparent?: boolean;  
  priority?: boolean;
  status?: RequestStatus;
  statusMessage?: string;
  handleOnClose?: () => void;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const getClasses = (): string => {
    const classes: any = { 
      transparent: props.transparent,
      priority: props.priority
    };

    return classNames("tickerr-modal-wrapper", classes);
  }

  const getStatusMessage = (): JSX.Element => {
    if(
      (props.status === RequestStatus.Success || props.status === RequestStatus.Error) && 
      props.statusMessage
    ) {
      return (
        <div className={classNames("tickerr-modal-status-message", props.status.toLowerCase())}>
          <h1 className="passion-one-font">{props.statusMessage}</h1>
        </div>
      )
    }
  }

  const getModalContent = (): JSX.Element => {
    if(props.status === RequestStatus.Loading) {
      return (
        <LoadingIcon />
      )
    }

    return (
      <div id={`${props.id}-content`} className="tickerr-modal-content" onClick={(e: any) => e.stopPropagation()}>
        {props.children}
        {getStatusMessage()}
      </div>
    )
  }

  return ReactDOM.createPortal(
    <div id={props.id} className={getClasses()} onClick={props.handleOnClose}>
      {getModalContent()}
    </div>,
    document.body
  );
}