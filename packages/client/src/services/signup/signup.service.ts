import { request } from '../fetch-wrapper/request';
import { SignUpRequestDTO } from './_types';
import { API_BASE_URL } from '@/utils/constants';

const API_URL = `${API_BASE_URL}auth/signup`;

const SignUpAPI = {
  signup(data: SignUpRequestDTO) {
    return request.post({ url: API_URL, data });
  },
};

export const SignUpService = {
  signup(data: SignUpRequestDTO) {
    try {
      return SignUpAPI.signup(data);
    } catch (error) {
      console.error(`SIGN UP REQUEST ERROR: ${error}`);
      throw error;
    }
  },
};
