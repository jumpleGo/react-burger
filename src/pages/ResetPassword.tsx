import React, { useEffect, useState } from "react";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPasswordRequest, resetPasswordRequest } from "../api/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import ResetPasswordStyles from "../styles/pages/ResetPassword.module.css";
import { getCookie } from "../services/utils/cookie";

interface ResetPasswordProps {}

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordRequest({
      password,
      token: code,
    })
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (getCookie("token")) navigate("/profile");
    if (location.state?.from?.pathname !== "/forgot-password") {
      navigate(-1);
    }
  }, []);

  return (
    <main className={ResetPasswordStyles.wrapper}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form onSubmit={submit}>
        <Input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={"ShowIcon"}
          placeholder={"Введите новый пароль"}
        />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={"Введите код из письма"}
          extraClass={"mt-6"}
        />
        <Button size="large" htmlType={"submit"} extraClass={"mt-6"}>
          Сохранить
        </Button>
      </form>
      <div className={`${ResetPasswordStyles.footer} text_type_main-default`}>
        <span>Вспомнили пароль?</span>
        <NavLink to="/login" className={ResetPasswordStyles.link}>
          Войти
        </NavLink>
      </div>
    </main>
  );
};

export default ResetPassword;
