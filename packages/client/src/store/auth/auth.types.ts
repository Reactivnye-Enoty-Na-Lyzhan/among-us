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

export type SignInRequestDTO = {
  password: string;
  phone: string;
};

export type SignUpRequestDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignInRequestSuccessfulResponse = string;

export type SignUpRequestSuccessfulResponse = {
  id: number;
};

export type APIErrorResponse = {
  reason: string;
  error?: string;
};
