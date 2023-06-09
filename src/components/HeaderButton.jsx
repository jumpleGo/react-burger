import HeaderButtonStyles from '../styles/HeaderButton.module.css'
import PropTypes from 'prop-types';
function HeaderButton (props) {
    const activeStatusClass = props.active ? HeaderButtonStyles.active : HeaderButtonStyles.notActive
    return (
        <button className={`${activeStatusClass} ${HeaderButtonStyles.headerButton} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}>
            {props.children}
        </button>
    )
}

HeaderButton.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node
}

export default HeaderButton