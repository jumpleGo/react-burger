import React from "react";
import ProfileSettings from "../components/Profile/ProfileSettings";

import ProfileStyles from "../styles/pages/Profile.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { setCookie } from "../services/utils/cookie";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
function Profile() {
  const { logout, ...auth } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const logoutCall = () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className={ProfileStyles.wrapper}>
      <div className={ProfileStyles.links}>
        <NavLink
          className={`${ProfileStyles.link} ${ProfileStyles.active} text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.link} text_type_main-medium`}
          type={"secondary"}
        >
          История заказов
        </NavLink>
        <Button
          onClick={logoutCall}
          extraClass={`${ProfileStyles.link} text_type_main-medium`}
          type={"secondary"}
          htmlType={"button"}
        >
          Выход
        </Button>
        <span
          className={`mt-20 text_type_main-default ${ProfileStyles.description}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <div>
        <ProfileSettings />
      </div>
    </main>
  );
}

export default Profile;
