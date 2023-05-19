import PropTypes from "prop-types";
import AppContentStyles from '../../styles/App/AppContent.module.css'

function AppContent (props) {
    return (
        <main className={AppContentStyles.appContent}>
            {props.children}
        </main>
    )
}

AppContent.propTypes = {
    children: PropTypes.node
}

export default AppContent