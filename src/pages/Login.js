import React, { useEffect, useState } from "react";
import {
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginStyles from "../styles/pages/Login.module.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { getCookie } from "../services/utils/cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preorder = searchParams.get("preorder");

  useEffect(() => {
    if (getCookie("token")) navigate("/profile");
  }, []);

  const { login, ...auth } = useAuth();
  const action = (e) => {
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
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className={LoginStyles.wrapper}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form onSubmit={action} className={LoginStyles.form}>
        <EmailInput
          value={email}
          extraClass={"mt-6"}
          onChange={onEmailChange}
        />
        <Input
          value={password}
          extraClass={"mt-6"}
          type={"password"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
          onChange={onPasswordChange}
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
}

export default Login;
