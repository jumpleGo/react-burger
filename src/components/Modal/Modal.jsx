import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalStyles from '../../styles/Modal/Modal.module.css'
import PropTypes from "prop-types";
import {useEffect} from "react";

function Modal({onClose, classes, title, children, isOpen}) {
    useEffect(() => {
        function handleEsc(event) {
            if (event.keyCode === 27) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`${ModalStyles.modal} ${classes}`} >
            {title &&
                <div className={ModalStyles.modalHeader}>
                    <h2 className="text text_type_main-large">{title}</h2>
                </div>
            }
            <div onClick={() => onClose()} className={ModalStyles.close}>
                <CloseIcon type="primary" />
            </div>
            {children}
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    classes: PropTypes.string.isRequired
}
export default Modal