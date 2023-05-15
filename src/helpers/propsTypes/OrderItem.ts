import PropTypes from "prop-types";

export const OrderItemPropsType =  {
    status: PropTypes.bool.isRequired,
    order: {
        number: PropTypes.number.isRequired
    },
    name:PropTypes.string.isRequired,
}