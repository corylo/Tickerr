import React from "react";

import { LoadingIcon } from "../../components/loadingIcon/loadingIcon";

import { RequestStatus } from "../../enums/requestStatus";

interface PageProps {
  id?: string;
  children: JSX.Element | JSX.Element[];
  status?: RequestStatus;
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

  return (
    <div id={props.id} className="tickerr-page">
      {getPageContent()}
      {getLoading()}
    </div>
  )
}