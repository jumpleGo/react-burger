import { useContext, useState, createContext, ReactNode } from "react";

import { getCookie, setCookie } from "../services/utils/cookie";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  token,
  userRequest,
} from "../api/auth";
import { UserData } from "../api/types";

const clearCookie = () => {
  setCookie("token", "");
  setCookie("refreshToken", "");
};

const AuthContext: React.Context<IUserProvideAuth | undefined> = createContext<
  IUserProvideAuth | undefined
>(undefined);

interface ProvideAuthProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  // @ts-ignore
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface IUserProvideAuth {
  user: UserData | null;
  getUser: () => Promise<boolean>;
  register: (form: any) => Promise<void>;
  login: (form: any) => Promise<void>;
  logout: () => Promise<void>;
}
export function useProvideAuth(): IUserProvideAuth {
  const [user, setUser] = useState<UserData | null>(null); // Replace with appropriate user type

  const errorHandler = (error: Error) => {
    if (error.message === "jwt expired") {
      updateToken().then(() => getUser());
    } else if (error.message === "Token is invalid") {
      clearCookie();
    } else {
      clearCookie();
    }
  };

  const updateToken = () => {
    return token({ token: getCookie("refreshToken") })
      .then((res) => {
        setCookie("token", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => errorHandler(error));
  };

  const getUser = async () => {
    try {
      const data = await userRequest();
      if (data.success) {
        setUser({ ...data.user, id: data.user._id });
        return true;
      }
      return false;
    } catch (error: any) {
      errorHandler(error);
      return false;
    }
  };

  const login = async (form: any) => {
    try {
      const data = await loginRequest(form);
      if (data.success) {
        setCookie("token", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (form: any) => {
    try {
      const data = await registerRequest(form);
      if (data.success) {
        setCookie("token", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        setUser({ ...data.user, id: data.user._id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      clearCookie();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    getUser,
    register,
    login,
    logout,
  };
}
