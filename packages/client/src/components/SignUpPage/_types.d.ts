export type SignUpFormData = {
  name: string;
  secondName: string;
  email: string;
  phone: string;
  login: string;
  password: string;
};

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
};
