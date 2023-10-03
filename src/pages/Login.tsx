import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "../styles/pages/Login.module.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getCookie } from "../services/utils/cookie";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preorder = searchParams.get("preorder");

  useEffect(() => {
    if (getCookie("token")) navigate("/profile");
  }, []);

  const { login, ...auth } = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    login({
      password,
      email,
    })
      .then(() => {
        if (preorder) navigate("/");
        else navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <main className={LoginStyles.wrapper}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form onSubmit={handleLogin} className={LoginStyles.form}>
        <EmailInput
          value={email}
          extraClass={"mt-6"}
          onChange={handleEmailChange}
        />
        <Input
          value={password}
          extraClass={"mt-6"}
          type={"password"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
          onChange={handlePasswordChange}
        />
        <Button
          extraClass={"mt-6"}
          size="large"
          htmlType={"submit"}
          disabled={!email || !password}
        >
          Войти
        </Button>
      </form>
      <div className={`${LoginStyles.footer} mt-20`}>
        <div className={`${LoginStyles.linkBlock} text_type_main-default`}>
          <span>Вы новый пользователь?</span>
          <NavLink className={LoginStyles.link} to="/register">
            Зарегистрироваться
          </NavLink>
        </div>
        <div className={`${LoginStyles.linkBlock} mt-4 text_type_main-default`}>
          <span>Забыли пароль?</span>
          <NavLink className={LoginStyles.link} to="/forgot-password">
            Восстановить пароль
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default Login;
