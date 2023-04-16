export type SigninRequestData = {
  login: string;
  password: string;
};

export type SignUpRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpRequestResponse =
  | {
      id: number;
    }
  | {
      reason: string;
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
