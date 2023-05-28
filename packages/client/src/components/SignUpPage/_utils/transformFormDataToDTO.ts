import { SignUpRequestDTO } from '@/store/auth/auth.types';
import type { SignUpFormData } from '../_types';

export function transformFormDataToDTO(
  formData: SignUpFormData
): SignUpRequestDTO {
  return {
    firstName: formData.name,
    lastName: formData.secondName,
    username: formData.login,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
  };
}
