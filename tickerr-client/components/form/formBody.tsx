import React from "react";

interface FormBodyProps {  
  children: any;
}

export const FormBody: React.FC<FormBodyProps> = (props: FormBodyProps) => {  
  return (
    <div className="tickerr-form-body">
      {props.children}
    </div>
  );
}