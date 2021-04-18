import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Tooltip, TooltipSide } from "../tooltip/tooltip";

interface ButtonProps {
  children: any;
  className?: string;  
  id?: string;
  url?: string;
  external?: boolean;
  tooltip?: string;
  tooltipSide?: TooltipSide;
  handleOnClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  const getTooltip = (): JSX.Element => {
    if(props.tooltip) {
      return (
        <Tooltip text={props.tooltip} side={props.tooltipSide || TooltipSide.Right} />
      )
    }
  }

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
        {getTooltip()}
      </button>
    );
  }

  return null;
};
