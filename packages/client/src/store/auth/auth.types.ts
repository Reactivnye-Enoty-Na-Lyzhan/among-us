export type SigninRequestData = {
  login: string;
  password: string;
};

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type SignUpRequestDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
export type SignInRequestDTO = {
  password: string;
  phone: string;
};

export type SignUpRequestErrorResponse = {
  reason: string;
  error?: string;
};

export type SignUpRequestSuccessfulResponse = {
  id: number;
};
