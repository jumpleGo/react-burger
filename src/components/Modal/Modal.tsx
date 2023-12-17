import React, { FunctionComponent, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from "../../styles/Modal/Modal.module.css";
import PropTypes from "prop-types";
import ModalOverlay from "./ModalOverlay";
import { useDispatch } from "react-redux";

import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  classes: string;
  title?: string;
  children: React.ReactNode;
  isRouteModal?: boolean;
  close: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  classes,
  title,
  children,
  close,
  isRouteModal,
}) => {
  const navigate = useNavigate();

  const closeModal = () => {
    if (isRouteModal) {
      navigate(-1);
    }
    close();
  };

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const element: HTMLElement | null = document.getElementById("modal-root");

  if (!element) {
    return null; // или что-то еще в зависимости от вашей логики
  }

  return ReactDOM.createPortal(
    <div className={ModalStyles.modalWrapper} id="modal">
      <div className={`${ModalStyles.modal} ${classes}`}>
        {title && (
          <div className={ModalStyles.modalHeader}>
            <h2 className="text text_type_main-large">{title}</h2>
          </div>
        )}
        <div onClick={closeModal} className={ModalStyles.close}>
          <CloseIcon type="primary" />
        </div>
        <ModalOverlay onClose={closeModal} />
        {children}
      </div>
    </div>,
    element,
  );
};

export default Modal;
