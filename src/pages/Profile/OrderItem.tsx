import React, { useEffect, useState } from "react";
import OrderItemStyles from "../../styles/Profile/OrderItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";
import { IOrder } from "../../api/types";
import { ISocketOrder } from "../../services/types";
import { useSelector } from "../../services/store";
import { getStatus } from "../../helpers/transcriptions";
import { RootState } from "../../services/store";

interface IOrderItemProps {
  data: ISocketOrder;
}
const OrderItem: React.FC<IOrderItemProps> = ({ data }) => {
  const ingredients: IBurgerIngredientItem[] = useSelector(
    (state) => state.storeReducer.ingredients,
  );
  const [currentIngredients, setCurrentIngredients] = useState<
    Record<string, IBurgerIngredientItem[]>
  >({});

  const [ingredientsTotal, setIngredientsTotal] = useState<number>(0);

  useEffect(() => {
    const currIngredients: Record<string, IBurgerIngredientItem[]> =
      data.ingredients?.reduce((acc: Record<string, any>, itemId: string) => {
        const ingredient = ingredients.find((item) => item._id === itemId);
        if (!acc[itemId]) acc[itemId] = [ingredient];
        else acc[itemId].push(ingredient);
        return acc;
      }, {});
    setCurrentIngredients(currIngredients);

    const totalPrice = Object.keys(currIngredients).reduce((acc, item) => {
      acc += currIngredients[item]?.[0]?.price * currIngredients[item].length;
      return acc;
    }, 0);
    setIngredientsTotal(totalPrice);
  }, [ingredients, data]);

  return (
    <div className={`${OrderItemStyles.orderWrapper} mt-30`}>
      <div className={OrderItemStyles.orderItem}>
        <div className="text text_type_digits-default mb-10">
          #{data.number}
        </div>
        <div className="text text_type_main-medium mb-3 ta-l">{data.name}</div>
        <div className="text text_type_main-default mb-15 ta-l aqua">
          {getStatus(data.status)}
        </div>
        <div className="text text_type_main-medium mb-6 ta-l">Состав</div>
        <div className={`${OrderItemStyles.orderItem__ingredients} mr-6 mb-10`}>
          {Object.keys(currentIngredients).length &&
            Object.keys(currentIngredients).map((key, index) => {
              return (
                <div
                  className={OrderItemStyles.orderItem__ingredients_wrapper}
                  key={index}
                >
                  <div className={OrderItemStyles.orderItem__ingredients_left}>
                    <div
                      className={OrderItemStyles.orderItem__ingredient_avatar}
                      style={{
                        backgroundImage: `url(${currentIngredients[key]?.[0]?.image_mobile})`,
                      }}
                    />
                    <p className="text_type_main-default">
                      {currentIngredients[key]?.[0]?.name}
                    </p>
                  </div>
                  <div className={OrderItemStyles.orderItem__ingredients_right}>
                    <span className="text_type_main-default">
                      {currentIngredients[key].length} x{" "}
                      {currentIngredients[key]?.[0]?.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
        </div>
        <div className={`${OrderItemStyles.orderItem__total}`}>
          <p className="text text_type_main-default text_color_inactive">
            {new Date(data.createdAt).toDateString()}
          </p>
          <div
            className={`${OrderItemStyles.orderItem__total_price} text text_type_digits-default`}
          >
            {ingredientsTotal}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
