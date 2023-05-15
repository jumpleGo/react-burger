import PropTypes from "prop-types";
import AppContentStyles from '../../styles/App/AppContent.module.css'

function AppContent (props) {
    return (
        <div className={AppContentStyles.appContent}>
            {props.children}
        </div>
    )
}

AppContent.propTypes = {
    children: PropTypes.node
}

export default AppContent