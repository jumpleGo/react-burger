export interface UserData {
  _id: string;
  email: string;
  name: string;
  id?: string;
}
export type ApiDataResponse = {
  data: any;
  success: boolean;
};

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
