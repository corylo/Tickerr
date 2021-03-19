import React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

interface ModalProps {
  id: string;
  children: any;
  transparent?: boolean;
  whiteout?: boolean;
  priority?: boolean;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const getClasses = (): string => {
    const classes: any = { 
      whiteout: props.whiteout,
      transparent: props.transparent,
      priority: props.priority
    };

    return classNames("tickerr-modal-wrapper", classes);
  }

  return ReactDOM.createPortal(
    <div id={props.id} className={getClasses()}>
      <div className="tickerr-modal-content">
        {props.children}
      </div>
    </div>,
    document.body
  );
}