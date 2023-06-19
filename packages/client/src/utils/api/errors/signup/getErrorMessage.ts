import { createErrorMessageGetter } from '../createErrorMessageGetter';
import { signUpAPIErrorClassifiers } from './errorClassifiers';

export const getSignupAPIErrorMessage = createErrorMessageGetter({
  apiName: ' signup',
  errorClassifiers: signUpAPIErrorClassifiers,
});
