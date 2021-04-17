import React from "react";

import { FormError } from "../../enums/formError";
import { FormStatus } from "../../enums/formStatus";

interface FormProps {  
  children: any;
  errors?: any;
  status?: FormStatus;
  successMessage?: string;
  errorMessage?: string;
}

export const Form: React.FC<FormProps> = (props: FormProps) => {  
  const getFormErrorMessage = (): JSX.Element | null => {
    if(props.errors) {
      const errorCount: number = Object.entries(props.errors)
        .map((entry: any) => ({ key: entry[0], value: entry[1] }))
        .filter((entry: any) => entry.value !== FormError.None)
        .length;

      if(errorCount > 0) {
        const message: string = errorCount === 1 
          ? "There is an error that needs to be fixed"
          : `There are ${errorCount} errors that need to be fixed`;

        return (
          <div className="tickerr-form-error-message">
            <h1 className="passion-one-font">{message}</h1>
          </div>
        )
      }
    }

    return null;
  }
  
  const getSubmitStatusMessage = (): JSX.Element | null => {
    if(props.status === FormStatus.SubmitSuccess) {
      const successMessage: string = props.successMessage || "Success!";
      return (
        <div className="tickerr-form-submit-success-message">
          <h1 className="passion-one-font">{successMessage}</h1>
        </div>
      )
    } else if(props.status === FormStatus.SubmitError) {
      const errorMessage: string = props.errorMessage || "Whoops! Unable to complete request. Please Refresh And Try Again.";

      return (
        <div className="tickerr-form-submit-error-message">
          <h1 className="passion-one-font">{errorMessage}</h1>
        </div>
      )
    }
  }

  return (
    <div className="tickerr-form">
      {props.children}
      {getFormErrorMessage()}
      {getSubmitStatusMessage()}
    </div>
  );
}