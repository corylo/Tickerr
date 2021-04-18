import React, { useEffect, useState } from "react";

interface LoadingDotsProps {
  
}

export const LoadingDots: React.FC<LoadingDotsProps> = (
  props: LoadingDotsProps
) => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if(count === 3) {
        setCount(1);
      } else {
        setCount(count + 1);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    }
  }, [count]);

  const getDots = (): string => {
    let dots: string = "";

    for(let i = 0; i < count; i++){
      dots = `${dots}.`;
    }

    return dots;
  }

  return (
    <span className="loading-dots">{getDots()}</span>  
  );
};