import React from "react";
import classNames from "classnames";

interface LoadingIconProps {
  white?: boolean;
}

export const LoadingIcon: React.FC<LoadingIconProps> = (
  props: LoadingIconProps
) => {
  const classes: string = classNames("loading-icon", { white: props.white });

  return (
    <div className="loading-icon-wrapper">
      <div className={classes}>
        <i className="far fa-heart-rate" />
      </div>
    </div>
  );
};
