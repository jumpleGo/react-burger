import { getCookie } from "../services/utils/cookie";

const API_URL = "https://norma.nomoreparties.space/api/";

const request = (path: string, options: RequestInit): Promise<any> => {
  const url = API_URL + path;
  return fetch(url, options).then(resolver);
};

const resolver = (res: Response): Promise<any> => {
  return res.ok
    ? res.json().then((data) => Promise.resolve(data))
    : res.json().then((err) => Promise.reject(err));
};

const get = (path: string, body?: any): Promise<any> => {
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${getCookie("token")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  if (body) options.body = JSON.stringify(body);
  return request(path, options);
};

const post = (path: string, payload: any): Promise<any> => {
  return request(path, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const patch = (path: string, payload: any): Promise<any> => {
  return request(path, {
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
