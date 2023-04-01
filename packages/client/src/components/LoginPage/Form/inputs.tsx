import FormInput from '@/components/Form/Input/Input';
import { Props as TInputProps } from '@/components/Form/Input/typings';
import { validation } from '@/utils/input-validators/validators';

const enum EnumFormFields {
  LOGIN = 'login',
  PASSWORD = 'password',
}

type TPredefinedProps = Omit<TInputProps, 'context'>;

const mapFormFieldToProps: Record<EnumFormFields, TPredefinedProps> = {
  [EnumFormFields.LOGIN]: {
    displayName: 'login',
    type: 'text',
    name: 'login',
    placeholder: 'Введите логин',
    label: 'Логин',
    validator: validation.login,
  },
  [EnumFormFields.PASSWORD]: {
    displayName: 'login',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    validator: validation.password,
  },
};

export const mapFormFieldToRenderFunc = Object.entries(
  mapFormFieldToProps
).reduce((acc, [field, props]: [EnumFormFields, TPredefinedProps]) => {
  acc[field] = (propsNew: TInputProps) => (
    <FormInput {...props} {...propsNew}></FormInput>
  );
  return acc;
}, {} as Record<EnumFormFields, React.FC<TInputProps>>);
