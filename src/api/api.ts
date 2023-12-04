import { getCookie } from "../services/utils/cookie";

const API_URL = "https://norma.nomoreparties.space/api/";

const request = <T>(path: string, options: RequestInit): Promise<T> => {
  const url = API_URL + path;

  return fetch(url, options).then((res) => resolver<T>(res));
};

const resolver = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json().then((data) => Promise.resolve(data))
    : res.json().then((err) => Promise.reject(err));
};

const get = <T>(path: string, body?: any): Promise<T> => {
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token") || ""}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  if (body) options.body = JSON.stringify(body);
  return request<T>(path, options);
};

const post = <T>(path: string, payload: any): Promise<T> => {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
  });
};

const patch = <T>(path: string, payload: any): Promise<T> => {
  return request<T>(path, {
    method: "PATCH",
    body: JSON.stringify(payload),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export { get, post, patch };
