import React from "react";
import classNames from "classnames";

import { Button } from "./button";
import { TooltipSide } from "../tooltip/tooltip";

interface IconButtonProps {
  id?: string;
  className?: string;
  icon: string;
  tooltip?: string;
  tooltipSide?: TooltipSide;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (
  props: IconButtonProps
) => {
  return (
    <Button 
      id={props.id} 
      className={classNames("icon-button", props.className)} 
      tooltip={props.tooltip}
      tooltipSide={props.tooltipSide}
      handleOnClick={props.handleOnClick}
    >
      <i className={props.icon} />
    </Button>
  );
};
