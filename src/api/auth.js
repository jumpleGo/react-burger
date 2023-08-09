import { get, patch, post } from "./api";
import { getCookie } from "../services/utils/cookie";
export const loginRequest = (payload) => {
  return post("auth/login", payload);
};

export const registerRequest = (payload) => {
  return post("auth/register", payload);
};

export const userRequest = () => {
  return get("auth/user");
};

export const logoutRequest = (payload) => {
  return post("auth/logout", {
    token: getCookie("refreshToken"),
  });
};

export const token = (payload) => {
  return post("auth/token", payload);
};

export const editUser = (payload) => {
  return patch("auth/user", payload);
};

export const resetPasswordRequest = (payload) => {
  return post("password-reset/reset", payload);
};

export const forgotPasswordRequest = (payload) => {
  return post("password-reset", payload);
};
