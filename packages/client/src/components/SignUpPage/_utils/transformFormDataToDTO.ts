import type { SignUpFormData, SignUpRequestDTO } from '../_types';

export function transformFormDataToDTO(
  formData: SignUpFormData
): SignUpRequestDTO {
  return {
    first_name: formData.name,
    second_name: formData.secondName,
    login: formData.login,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
  };
}
