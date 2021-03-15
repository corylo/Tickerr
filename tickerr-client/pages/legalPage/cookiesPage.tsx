import React from "react";

import { Page } from "../page/page";

import { useLoadLegalPolicyEffect, useUpdatePageTitleEffect } from "../../effects/appEffects";

import { RequestStatus } from "../../enums/requestStatus";

interface CookiesPageProps {
  
}

export const CookiesPage: React.FC<CookiesPageProps> = (props: CookiesPageProps) => {
  useUpdatePageTitleEffect("Tickerr | Cookie Policy");

  useLoadLegalPolicyEffect();

  return(
    <Page id="tickerr-cookies-page" status={RequestStatus.Success}>      
      <div id="tickerr-cookie-policy" className="tickerr-legal-policy">
        { //@ts-ignore
          <div name="termly-embed" data-id="9fa49011-7e47-44ca-b759-a996ff7f9ab4" data-type="iframe" />
        }
      </div>
    </Page>
  )
}