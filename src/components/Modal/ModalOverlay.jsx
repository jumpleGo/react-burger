import ModalOverlayStyles from '../../styles/Modal/ModalOverlay.module.css'
import PropTypes from "prop-types";
function ModalOverlay(props) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={() => props.onClose()} />
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay