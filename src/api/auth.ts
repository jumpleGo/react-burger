import { get, patch, post } from "./api";
import {
  ApiLoginResponse,
  ApiUserResponse,
  ApiDataResponse,
  ApiEmptyResponse,
  ApiRegisterResponse,
  ITokenUpdate,
} from "./types";
import { getCookie } from "../services/utils/cookie";

export const loginRequest = (payload: any): Promise<ApiLoginResponse> => {
  return post<ApiLoginResponse>("auth/login", payload);
};

export const registerRequest = (payload: any): Promise<ApiRegisterResponse> => {
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

export const token = (payload: any): Promise<ITokenUpdate> => {
  return post<ITokenUpdate>("auth/token", payload);
};

// export const editUser = (payload: any) => {
//   return patch("auth/user", payload);
// };

export const resetPasswordRequest = (
  payload: any,
): Promise<ApiEmptyResponse> => {
  return post<ApiEmptyResponse>("password-reset/reset", payload);
};

export const forgotPasswordRequest = (
  payload: any,
): Promise<ApiEmptyResponse> => {
  return post<ApiEmptyResponse>("password-reset", payload);
};
