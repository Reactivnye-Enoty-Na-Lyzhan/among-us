import {
  DefaultValidityStateType,
  InputsParamsType,
} from '../utils/gameParams';

export type HandleChangeType = (
  evt: React.ChangeEvent<HTMLInputElement>
) => void;

export type CheckInputValidityType = (
  evt: React.FocusEvent<HTMLInputElement>
) => void;

export type ResetValuesType = () => void;

export type ControlParamType = (
  name: keyof InputsParamsType,
  value: string,
  min: number,
  max: number
) => void;

export type UseParamsValidationType = {
  values: InputsParamsType;
  inputsValidity: DefaultValidityStateType;
  isFormValid: boolean;
  handleChange: HandleChangeType;
  handleIncrease: ControlParamType;
  handleDecrease: ControlParamType;
  checkInputValidity: CheckInputValidityType;
  resetValues: () => void;
};

export type Props = {
  defaultValues: InputsParamsType;
  defaultValidityState: DefaultValidityStateType;
};
