import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: any;
  className?: string;  
  handleOnClick: () => void;
}

export const Button: React.FC<ButtonProps> = (
  props: ButtonProps
) => {
  return (
    <button type="button" className={classNames("button", props.className)} onClick={props.handleOnClick}>
      {props.children}
    </button>
  );
};
