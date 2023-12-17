import { get, patch, post } from "./api";
import {
  ApiLoginResponse,
  ApiUserResponse,
  ApiEmptyResponse,
  ApiRegisterResponse,
  ITokenUpdate,
  IRegisterData,
  ILoginData,
  IResetPasswordData,
  IForgotPasswordData,
  ITokenData,
} from "./types";
import { getCookie } from "../services/utils/cookie";

export const loginRequest = (
  payload: ILoginData,
): Promise<ApiLoginResponse> => {
  return post<ApiLoginResponse>("auth/login", payload);
};

export const registerRequest = (
  payload: IRegisterData,
): Promise<ApiRegisterResponse> => {
  return post<ApiRegisterResponse>("auth/register", payload);
};

export const userRequest = (): Promise<ApiUserResponse> => {
  return get<ApiUserResponse>("auth/user");
};

export const logoutRequest = (): Promise<ApiEmptyResponse> => {
  return post<ApiEmptyResponse>("auth/logout", {
    token: getCookie("refreshToken"),
  });
};

export const token = (payload: ITokenData): Promise<ITokenUpdate> => {
  return post<ITokenUpdate>("auth/token", payload);
};

// export const editUser = (payload: any) => {
//   return patch("auth/user", payload);
// };

export const resetPasswordRequest = (
  payload: IResetPasswordData,
): Promise<ApiEmptyResponse> => {
  return post<ApiEmptyResponse>("password-reset/reset", payload);
};

export const forgotPasswordRequest = (
  payload: IForgotPasswordData,
): Promise<ApiEmptyResponse> => {
  return post<ApiEmptyResponse>("password-reset", payload);
};
