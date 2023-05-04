export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};

export type SignInRequestDTO = {
  password: string;
  login: string;
};

export type SignUpRequestDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignInSuccessfulResponse = 'OK';

export type SignUpSuccessfulResponse = {
  id: number;
};

export type APIErrorResponse = {
  reason: string;
  error?: string;
};

export type TOAuthData = {
  code: string;
  redirect_uri: string;
};

export type TServiceId = {
  service_id: string;
};
