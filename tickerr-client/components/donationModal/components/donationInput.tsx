import React, { useRef, useState } from "react";

import { IconButton } from "../../buttons/iconButton";
import { InputWrapper } from "../../inputWrapper/inputWrapper";
import { TooltipSide } from "../../tooltip/tooltip";

import { AnalyticsUtility } from "../../../utilities/analyticsUtility";

interface DonationInputProps {  
  address: string;
  label: string;
}

export const DonationInput: React.FC<DonationInputProps> = (props: DonationInputProps) => { 
  const copyRef: any = useRef(null);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAddress = (): void => {
    copyRef.current.select();
    document.execCommand("copy");
    setCopied(true);

    AnalyticsUtility.log("ticker_copy_donation_address", { label: props.label });
  }

  return (   
    <div className="donation-input-wrapper">
      <InputWrapper label={props.label}>
        <input 
          ref={copyRef} 
          className="pt-sans-font"
          type="text"
          tabIndex={-1}
          value={props.address} 
          onChange={() => {}}
        />
      </InputWrapper>
      <IconButton
        className="copy-button"
        icon="fad fa-copy"
        tooltip={copied ? "Copied!" : "Copy"}
        tooltipSide={TooltipSide.Left}
        handleOnClick={handleCopyAddress}
      />
    </div>
  )
}