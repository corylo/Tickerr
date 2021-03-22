import React from "react";

interface LoadingIconProps {
  poweredBy?: boolean;
}

export const LoadingIcon: React.FC<LoadingIconProps> = (
  props: LoadingIconProps
) => {
  const getPoweredBy = (): JSX.Element => {
    if(props.poweredBy) {
      return(
        <h1 className="powered-by passion-one-font">
          <span>Powered By</span>
          <img src="/img/brands/coin-gecko-logo.png" />
          <span>Coin Gecko</span>
        </h1>
      )
    }
  }

  return (
    <div className="loading-icon-wrapper">
      <div className="loading-icon">
        <i className="far fa-heart-rate" />
        {getPoweredBy()}
      </div>
    </div>
  );
};
