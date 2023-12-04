import React from "react";
import ProfileSettings from "../components/Profile/ProfileSettings";

import ProfileStyles from "../styles/pages/Profile.module.css";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { setCookie } from "../services/utils/cookie";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProtectedRouteElement } from "../components/protectedRoute";
import ProfileOrders from "./Profile/ProfileOrders";
import ProfileOrderItem from "./Profile/ProfileOrderItem";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
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
          className={`${ProfileStyles.link} text_type_main-medium`}
          to="/profile"
        >
          Профиль
        </NavLink>
        <NavLink
          className={`${ProfileStyles.link} text_type_main-medium`}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
        <Button
          onClick={logoutCall}
          extraClass={`${ProfileStyles.link} text_type_main-medium`}
          type="secondary"
          htmlType="button"
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
        <Routes>
          <Route
            path="/"
            element={<ProtectedRouteElement element={<ProfileSettings />} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRouteElement element={<ProfileOrders />} />}
          />
          <Route
            path="/profile/orders/:id"
            element={<ProtectedRouteElement element={<ProfileOrderItem />} />}
          />
        </Routes>
      </div>
    </main>
  );
};

export default Profile;
