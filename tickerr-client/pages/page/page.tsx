import React from "react";

import { LoadingIcon } from "../../components/loadingIcon/loadingIcon";

import { RequestStatus } from "../../enums/requestStatus";

interface PageProps {
  id?: string;
  children: JSX.Element | JSX.Element[];
  status?: RequestStatus;
  errorMessage?: string;
}

export const Page: React.FC<PageProps> = (props: PageProps) => {
  const getPageContent = (): JSX.Element => {
    if(
      props.status !== RequestStatus.Loading &&
      props.status !== RequestStatus.Error
    ) {      
      return (
        <div className="tickerr-page-content">
          {props.children}
        </div>
      )
    }
  }

  const getLoading = (): JSX.Element => {
    if(props.status === RequestStatus.Loading) {
      return (
        <LoadingIcon />
      )
    }
  }

  const getPageMessage = (): JSX.Element => {
    if(props.status === RequestStatus.Error) {
      const message: string = props.errorMessage || "Whoops! We ran into an issue loading the page. Please refresh and try again.";

      return (
        <div className="tickerr-page-message">
          <h1 className="passion-one-font">{message}</h1>
        </div>
      )
    }
  }

  return (
    <div id={props.id} className="tickerr-page">
      {getPageContent()}
      {getLoading()}
      {getPageMessage()}
    </div>
  )
}