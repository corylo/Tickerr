import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: any;
  className?: string;  
  id?: string;
  handleOnClick: () => void;
}

export const Button: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  return (
    <button 
      type="button" 
      id={props.id} 
      className={classNames("button", props.className)} 
      onClick={props.handleOnClick}
    >
      {props.children}
    </button>
  );
};
