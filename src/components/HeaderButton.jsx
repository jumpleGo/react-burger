import HeaderButtonStyles from '../styles/HeaderButton.module.css'
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
function HeaderButton (props) {
    const activeStatusClass = props.active ? HeaderButtonStyles.active : HeaderButtonStyles.notActive
    return (
        <NavLink to={props.to} className={`${activeStatusClass} ${HeaderButtonStyles.headerButton} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}>
            {props.children}
        </NavLink>
    )
}

HeaderButton.propTypes = {
    to: PropTypes.string,
    active: PropTypes.bool,
    children: PropTypes.node
}

export default HeaderButton