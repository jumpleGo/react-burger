import PropTypes from "prop-types";

export const OrderItemPropsType =  {
    success: PropTypes.bool.isRequired,
    order: PropTypes.shape({
        number: PropTypes.number.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
}