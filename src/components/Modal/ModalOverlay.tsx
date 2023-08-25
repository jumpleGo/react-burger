import React from "react";
import ModalOverlayStyles from "../../styles/Modal/ModalOverlay.module.css";

interface ModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return <div className={ModalOverlayStyles.overlay} onClick={props.onClose} />;
};

export default ModalOverlay;
