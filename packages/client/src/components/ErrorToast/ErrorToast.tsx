import { useState, useEffect } from "react";
import './ErrorToast.css';
import getErrorMessage from "./getErrorMessage";

function ErrorToast() {
//TBD: move errorCode to global storage and update from controllers/api calls
  const [APIErrorCode, setAPIErrorCode] = useState<string|null>(null);
  const [errorObj, setErrorObj] = useState<Record<string, string>|null>(null);
  useEffect(() => {
    if(!APIErrorCode) {
        setErrorObj(null);
    } else {
        setErrorObj(getErrorMessage(APIErrorCode));
    }
  }, [APIErrorCode]);

  useEffect(() => {
    if (errorObj) {
      const timeout = setTimeout(() => {
        setAPIErrorCode(null);
      }, 5000);
      
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorObj]);

  return (
    <>
      {errorObj && (
        <div className="error-toast error-toast_position_upper-right">
          <h1 className="error-toast__code">{errorObj.code}</h1>
          <div className="error-toast__info">
            <h3 className="error-toast__header">К сожалению, что-то пошло не так...</h3>
            <h4 className="error-toast__subheader">Произошла ошибка:</h4>
            <p className="error-toast__message">{errorObj.message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorToast;
