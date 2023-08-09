import React, { useEffect } from "react";
import AppStyles from "../../styles/App/App.module.css";
import AppHeader from "./AppHeader";

import OrderDetails from "../Modal/OrderDetails";
import IngredientDetails from "../Modal/IngredientDetails";
import Modal from "../Modal/Modal";

import {
  addModalIngredient,
  cleanModalData,
  getIngredients,
} from "../../services/actions/store";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import Main from "../../pages/Main";
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import { ProvideAuth, useAuth } from "../../hooks/useAuth";
import { ProtectedRouteElement } from "../protectedRoute";
import Profile from "../../pages/Profile";
import ForgotPassword from "../../pages/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage";
import { getIngredientById } from "../../services/getters/store";
import { closeModal } from "../../services/actions/modal";

function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  const { state: routeState } = location;
  const itemById = useSelector((state) =>
    getIngredientById(state, routeState?.id),
  );
  const { isModalOpen } = useSelector((store) => store.modalReducer);
  useEffect(() => {
    if (itemById) {
      dispatch(
        addModalIngredient({
          content: itemById,
          type: "ingredient",
          classes: "pt-10 pl-10 pr-10 pb-15",
        }),
      );
    }
  }, [itemById]);

  const { modalData } = useSelector((store) => {
    return {
      modalData: store.storeReducer.currentIngredient.content
        ? store.storeReducer.currentIngredient
        : store.storeReducer.order,
    };
  });

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const close = () => {
    dispatch(cleanModalData());
    if (isModalOpen) {
      dispatch(closeModal());
    }
  };

  return (
    <div className={`${AppStyles.App}`}>
      <ProvideAuth>
        <AppHeader />
        {isModalOpen && (
          <Modal classes={modalData.classes} close={close}>
            <OrderDetails order={modalData.content} />
          </Modal>
        )}
        <Routes location={routeState?.backgroundLocation || location}>
          <Route path="/" element={<Main />} />
          <Route path="ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        {routeState?.backgroundLocation && (
          <Routes>
            {
              <Route
                path="/ingredients/:id"
                element={
                  modalData.content && (
                    <Modal
                      title={"Детали ингридиента"}
                      classes={modalData.classes}
                      isRouteModal
                      close={close}
                    >
                      <IngredientDetails ingredient={modalData.content} />
                    </Modal>
                  )
                }
              />
            }
          </Routes>
        )}
      </ProvideAuth>
    </div>
  );
}

export default App;
