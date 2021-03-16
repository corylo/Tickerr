import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { AnimatedTickerPriceDigit } from "./animatedTickerPriceDigit";

import { CurrencyUtility } from "../../utilities/currencyUtility";

interface AnimatedTickerPriceProps {
  value: number;
  change?: number;
  sidePanelToggled?: boolean;
}

export const AnimatedTickerPrice: React.FC<AnimatedTickerPriceProps> = (props: AnimatedTickerPriceProps) => {
  const price: string = CurrencyUtility.formatUSD(props.value);
  
  const calculateSize = (): number => {
    if(props.sidePanelToggled) {
      return ((window.innerWidth - 400) / price.length) * 1.6;
    }

    return (window.innerWidth / price.length) * 1.6;
  }

  const [size, setSize] = useState<number>(calculateSize());

  useEffect(() => {
    setSize(calculateSize());
  }, [props.sidePanelToggled]);

  useEffect(() => {
    const handleOnResize = (): void => setSize(calculateSize());
    
    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    }
  }, []);

  const getDigits = (): JSX.Element[] => {
    return price.split("")
      .map((digit: string, index: number) => (
        <AnimatedTickerPriceDigit 
          key={index} 
          digit={digit} 
          size={size}
        />
      ));
  }

  return(
    <div className={classNames("animated-ticker-price", CurrencyUtility.getChangeClass(props.change))}>
      {getDigits()}
    </div>
  )
}