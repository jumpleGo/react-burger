export interface UserData {
  _id: string;
  email: string;
  name: string;
  id?: string;
}

export interface ApiUserResponse {
  success: boolean;
  user: UserData;
}
export interface ApiEmptyResponse {
  success: boolean;
  message: string;
}

export interface ApiTokens {
  accessToken: string;
  refreshToken: string;
}
export type ApiLoginResponse = ApiUserResponse & ApiTokens;

export interface ApiRegisterResponse {
  success: boolean;
  user: UserData;
  accessToken: string;
  refreshToken: string;
}

export interface IOrder {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export interface ITokenUpdate {
  accessToken: string;
  refreshToken: string;
}

export interface IPayloadModalInterface<T> {
  content: T;
  type: string;
  classes?: string;
}
export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface IForgotPasswordData {
  email: string;
}
export interface IResetPasswordData {
  token: string;
  password: string;
}

export interface ITokenData {
  token: string | undefined;
}
