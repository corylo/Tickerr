import React, { useEffect, useState } from "react";

interface AnimatedTickerPriceDigitProps {
  digit: string;
  size: number;
}

export const AnimatedTickerPriceDigit: React.FC<AnimatedTickerPriceDigitProps> = (props: AnimatedTickerPriceDigitProps) => {
  const [digit, setDigit] = useState<string>("0");

  useEffect(() => {
    const timeout: any = setTimeout(() => setDigit(props.digit), 100);
    
    return () => clearTimeout(timeout);
  }, [props.digit]);

  const getStyles = (): React.CSSProperties => {
    const getWidth = (): number => {
      if(props.digit === "." || props.digit === ",") {
        return props.size * 0.3;
      } else if (props.digit === "1") {
        return props.size * 0.4;
      }

      return props.size * 0.5;
    }

    return {
      fontSize: `${props.size}px`, 
      height: `${props.size}px`, 
      lineHeight: `${props.size}px`,
      width: `${getWidth()}px`
    }
  }

  const getDigitScroller = (): JSX.Element => {
    const int: number = parseInt(digit);

    if(!isNaN(int)) {
      let digits: JSX.Element[] = [];

      for(let i = 0; i < 10; i++) {
        digits.push(<h1 key={i} className="animated-ticker-price-digit-scroller-number passion-one-font" style={getStyles()}>{i}</h1>)
      }
      
      return (
        <div className="animated-ticker-price-digit-scroller" style={{ ...getStyles(), transform: `translateY(${-props.size * int}px)` }}>
          {digits}
        </div>
      )
    }

    return (
      <h1 className="animated-ticker-price-digit-non-numeric passion-one-font" style={getStyles()}>{digit}</h1>
    )
  }

  return(
    <div className="animated-ticker-price-digit" style={getStyles()}>
      {getDigitScroller()}
    </div>
  )
}