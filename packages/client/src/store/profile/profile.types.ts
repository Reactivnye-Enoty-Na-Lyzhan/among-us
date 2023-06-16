export type User = {
  firstName: string;
  lastName: string;
  nickname: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export interface IAvatarResponse {
  result: string;
}
