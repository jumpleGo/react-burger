import ReactDOM from 'react-dom';
import ModalOverlay from "./ModalOverlay";
import ModalWrapperStyles from '../../styles/Modal/ModalWrapper.module.css'
import React from "react";
import PropTypes from "prop-types";

const element = document.getElementById("modal-root")
function ModalWrapper(props) {
    return ReactDOM.createPortal(
        (<section className={ModalWrapperStyles.modalWrapper} style={{display: props.display}}>
            {props.children && <ModalOverlay onClose={props.onClose} />}
            {props.children}
        </section>),
        element
    );
}

ModalWrapper.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    display: PropTypes.string.isRequired
}
export default ModalWrapper