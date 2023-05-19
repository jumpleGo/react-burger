import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from '../../styles/Modal/Modal.module.css'
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import ModalOverlay from "./ModalOverlay";

function Modal({onClose, classes, title, children}) {
    useEffect(() => {
        function handleEsc(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

            document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <div className={ModalStyles.modalWrapper}>

            <div className={`${ModalStyles.modal} ${classes}`} >
                {title &&
                    <div className={ModalStyles.modalHeader}>
                        <h2 className="text text_type_main-large">{title}</h2>
                    </div>
                }
                <div onClick={() => onClose()} className={ModalStyles.close}>
                    <CloseIcon type="primary" />
                </div>
                <ModalOverlay onClose={() => onClose()} />
                {children}
            </div>
        </div>

    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string,
    classes: PropTypes.string.isRequired
}
export default Modal