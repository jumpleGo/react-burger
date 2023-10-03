import React from "react";
import OrderDetailsStyles from "../../styles/Modal/OrderDetails.module.css";
import { IOrderItemProps } from "../../helpers/propsTypes/OrderItem";

interface OrderDetailsProps {
  order: IOrderItemProps;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className={OrderDetailsStyles.wrapper}>
      <h2 className="text text_type_digits-large mb-8">{order.order.number}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={require("./../../images/done.jpg")} alt="картинка" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
