import React from "react";
import classNames from "classnames";

import { Button } from "./button";

interface IconButtonProps {
  className?: string;
  icon: string;
  handleOnClick: () => void;
}

export const IconButton: React.FC<IconButtonProps> = (
  props: IconButtonProps
) => {
  return (
    <Button className={classNames("icon-button", props.className)} handleOnClick={props.handleOnClick}>
      <i className={props.icon} />
    </Button>
  );
};
