export type SignUpRequestDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpRequestError = {
  reason: string;
  error?: string;
};

export type SignUpRequestSuccessfulResponse = {
  id: number;
};

export type SignUpAPIResponse =
  | SignUpRequestError
  | SignUpRequestSuccessfulResponse;
