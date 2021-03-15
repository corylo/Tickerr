import React from "react";

import { Page } from "../page/page";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";

import { RequestStatus } from "../../enums/requestStatus";
import { Link } from "react-router-dom";

interface LegalPageProps {
  
}

export const LegalPage: React.FC<LegalPageProps> = (props: LegalPageProps) => {
  useUpdatePageTitleEffect("Tickerr | Legal");

  return(
    <Page id="tickerr-legal-page" status={RequestStatus.Success}>    
      <div id="tickerr-legal-page-links">
        <Link to="/legal/privacy" className="legal-page-link passion-one-font">Privacy Policy</Link>
        <Link to="/legal/terms" className="legal-page-link passion-one-font">{"Terms & Conditions"}</Link>
        <Link to="/legal/cookies" className="legal-page-link passion-one-font">Cookie Policy</Link>
      </div>
    </Page>
  )
}