import React from "react";
import classNames from "classnames";

import { Link } from "react-router-dom";

interface ButtonProps {
  children: any;
  className?: string;  
  id?: string;
  url?: string;
  external?: boolean;
  handleOnClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  if(props.url) {
    if(props.external) {
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
    } else {
      return (
        <Link
          id={props.id} 
          className={classNames("button link", props.className)} 
          to={props.url}
          onClick={props.handleOnClick}
        >
          {props.children}
        </Link>
      )
    }
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
