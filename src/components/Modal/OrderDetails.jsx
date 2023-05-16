import OrderDetailsStyles from '../../styles/Modal/OrderDetails.module.css'
import PropTypes from "prop-types";
import {BurgerIngredientItemPropsType} from "../../helpers/propsTypes/BurgerIngredientItem";
function OrderDetails ({order}) {
    return (
        <div className={OrderDetailsStyles.wrapper}>
            <h2 className="text text_type_digits-large mb-8">
                {order.order.number}
            </h2>
            <p className="text text_type_main-medium mb-15">
                идентификатор заказа
            </p>
            <img src={require('./../../images/done.jpg')} alt='картинка' />
            <p className="text text_type_main-default mt-15 mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}
const orderPropType = PropTypes.shape(BurgerIngredientItemPropsType)
OrderDetails.propTypes = {
    order: PropTypes.arrayOf(orderPropType).isRequired
}
export default OrderDetails