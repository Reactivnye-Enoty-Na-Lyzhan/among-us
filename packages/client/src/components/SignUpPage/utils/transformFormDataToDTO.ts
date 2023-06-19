import { SignUpRequestDTO } from '@/store/auth/auth.types';
import type { SignUpFormData } from '../types';

export function transformFormDataToDTO(
  formData: SignUpFormData
): SignUpRequestDTO {
  return {
    firstName: formData.name,
    lastName: formData.secondName,
    login: formData.login,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
  };
}
