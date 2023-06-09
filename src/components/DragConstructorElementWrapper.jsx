import PropTypes from "prop-types";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapperStyles from '../styles/DragConstructorElementWrapper.module.css'
function DragConstructorElementWrapper (props) {
    return (
        <div className={DragConstructorElementWrapperStyles.dragWrapper}>
            <DragIcon type="primary"  />
            {props.children}
        </div>
    )
}
DragConstructorElementWrapper.propTypes = {
    children: PropTypes.node
}
export default DragConstructorElementWrapper