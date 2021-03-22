import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: any;
  className?: string;  
  id?: string;
  url?: string;
  handleOnClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  if(props.url) {
    return (
      <a      
        id={props.id} 
        className={classNames("button link", props.className)} 
        href={props.url}
        onClick={props.handleOnClick}
      >
        {props.children}
      </a>
    )
  }

  if(props.handleOnClick) {
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
  }

  return null;
};
