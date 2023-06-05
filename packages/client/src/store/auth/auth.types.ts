export type User = {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
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
  firstName: string;
  lastName: string;
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
  message: string;
};

export type TOAuthData = {
  code: string;
};

export type TServiceId = {
  service_id: string;
};
