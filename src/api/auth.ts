import { get, patch, post } from "./api";
import {
  ApiLoginResponse,
  ApiUserResponse,
  ApiDataResponse,
  ApiLogoutResponse,
  ApiRegisterResponse,
} from "./types";
import { getCookie } from "../services/utils/cookie";

export const loginRequest = (payload: any): Promise<ApiLoginResponse> => {
  return post("auth/login", payload);
};

export const registerRequest = (payload: any): Promise<ApiRegisterResponse> => {
  return post("auth/register", payload);
};

export const userRequest = (): Promise<ApiUserResponse> => {
  return get("auth/user");
};

export const logoutRequest = (): Promise<ApiLogoutResponse> => {
  return post("auth/logout", {
    token: getCookie("refreshToken"),
  });
};

export const token = (payload: any) => {
  return post("auth/token", payload);
};

// export const editUser = (payload: any) => {
//   return patch("auth/user", payload);
// };

export const resetPasswordRequest = (payload: any) => {
  return post("password-reset/reset", payload);
};

export const forgotPasswordRequest = (payload: any) => {
  return post("password-reset", payload);
};
