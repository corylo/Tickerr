import React from "react";

import { Page } from "../page/page";

import { useLoadLegalPolicyEffect, useUpdatePageTitleEffect } from "../../effects/appEffects";

import { RequestStatus } from "../../enums/requestStatus";

interface PrivacyPageProps {
  
}

export const PrivacyPage: React.FC<PrivacyPageProps> = (props: PrivacyPageProps) => {
  useUpdatePageTitleEffect("Tickerr | Privacy Policy");

  useLoadLegalPolicyEffect();

  return(
    <Page id="tickerr-privacy-page" status={RequestStatus.Success}>      
      <div id="tickerr-privacy-policy" className="tickerr-legal-policy">
        { //@ts-ignore
          <div name="termly-embed" data-id="f0f0c459-f64c-4310-83d0-a34689844f0c" data-type="iframe" />
        }
      </div>
    </Page>
  )
}