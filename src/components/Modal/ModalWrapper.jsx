import ReactDOM from 'react-dom';import ModalOverlay from "./ModalOverlay";import React from "react";import PropTypes from "prop-types";const element = document.getElementById("modal-root")function ModalWrapper(props) {    return ReactDOM.createPortal(        (<section>            {props.children && <ModalOverlay onClose={props.onClose} />}            {props.children}        </section>),        element    );}ModalWrapper.propTypes = {    onClose: PropTypes.func.isRequired,    children: PropTypes.node}export default ModalWrapper