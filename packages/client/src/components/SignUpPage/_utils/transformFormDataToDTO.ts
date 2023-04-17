import { SignUpRequestDTO } from '@/services/signup/_types';
import type { SignUpFormData } from '../_types';

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
