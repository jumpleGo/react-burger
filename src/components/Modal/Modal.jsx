import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from '../../styles/Modal/Modal.module.css'
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import ModalOverlay from "./ModalOverlay";
import {useDispatch} from "react-redux";

import ReactDOM from "react-dom";

function Modal({ classes, title, children, close}) {
    const dispatch  = useDispatch()

    useEffect(() => {
        function handleEsc(event) {
            if (event.key === 'Escape') {
                close();
            }
        }

            document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const element = document.getElementById("modal-root")

    return (
        ReactDOM.createPortal(
        <div className={ModalStyles.modalWrapper}>

            <div className={`${ModalStyles.modal} ${classes}`} >
                {title &&
                    <div className={ModalStyles.modalHeader}>
                        <h2 className="text text_type_main-large">{title}</h2>
                    </div>
                }
                <div onClick={() => close()} className={ModalStyles.close}>
                    <CloseIcon type="primary" />
                </div>
                <ModalOverlay onClose={close} />
                {children}
            </div>
        </div>,
            element
        )

    );
}

Modal.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    classes: PropTypes.string.isRequired
}
export default Modal