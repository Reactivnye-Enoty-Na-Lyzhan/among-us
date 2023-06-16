import { useState, useEffect } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { selectApiError } from '@/store/ui/ui.slice';
import { useActions } from '@/hooks/useActions';
import getErrorMessage from './getErrorMessage';
import type { IApiError } from '@/store/ui/ui.types';
import './ErrorToast.css';

function ErrorToast() {
  const [errorObj, setErrorObj] = useState<IApiError | null>(null);
  const { code, message } = useTypedSelector(selectApiError);
  const { clearApiError } = useActions();

  useEffect(() => {
    if (code) {
      if (message) {
        setErrorObj({
          code,
          message,
        });

        return;
      }

      setErrorObj(getErrorMessage(code));
    }
  }, [code]);

  useEffect(() => {
    if (errorObj) {
      const timeout = setTimeout(() => {
        clearApiError();
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorObj]);

  return (
    <>
      {code && errorObj && (
        <div className="error-toast error-toast_position_upper-right">
          <h1 className="error-toast__code">{errorObj.code}</h1>
          <div className="error-toast__info">
            <h3 className="error-toast__header">
              К сожалению, что-то пошло не так...
            </h3>
            <h4 className="error-toast__subheader">Произошла ошибка:</h4>
            <p className="error-toast__message">{errorObj.message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorToast;
