import React from "react";

interface ModalActionsProps {  
  children: any;
}

export const ModalActions: React.FC<ModalActionsProps> = (props: ModalActionsProps) => {  
  return (
    <div className="tickerr-modal-actions">
      {props.children}
    </div>
  );
}