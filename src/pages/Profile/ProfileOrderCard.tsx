import React, { useEffect, useState } from "react";
import FeedCardStyles from "../../styles/Profile/FeedCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ISocketOrder } from "../../services/types";
import { useSelector } from "../../services/store";
import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";
import { getStatus } from "../../helpers/transcriptions";
interface ProfileOrderCardProps {
  data: ISocketOrder;
  onClick: (id?: string) => void;
}
const ProfileOrderCard: React.FC<ProfileOrderCardProps> = ({
  data,
  onClick,
}) => {
  const getDate = (date: Date) => new Date(date).toDateString();
  const ingredients: IBurgerIngredientItem[] = useSelector(
    (state: any) => state.storeReducer.ingredients,
  );
  const [currentIngredients, setCurrentIngredients] = useState<
    IBurgerIngredientItem[]
  >([]);
  const [ingredientsTotal, setIngredientsTotal] = useState<number>(0);
  useEffect(() => {
    const currIngredients: IBurgerIngredientItem[] = data.ingredients.map(
      (id) => ingredients.find((item) => item._id === id) || ingredients[0],
    );
    setCurrentIngredients(currIngredients);

    const totalPrice = currIngredients.reduce((acc, item) => {
      acc += item.price;
      return acc;
    }, 0);
    setIngredientsTotal(totalPrice);
  }, [ingredients, data]);
  return (
    <div className={`${FeedCardStyles.feedCard} p-6`} onClick={() => onClick()}>
      <div className={FeedCardStyles.header}>
        <div className="text text_type_digits-default">#{data.number}</div>
        <div className="text text_type_main-default text_color_inactive">
          {getDate(data.createdAt)}
        </div>
      </div>
      <div className={`${FeedCardStyles.title} text text_type_main-medium`}>
        {data.name}
      </div>
      <div className={`${FeedCardStyles.title} text text_type_main-medium`}>
        {getStatus(data.status)}
      </div>
      <div className={FeedCardStyles.content}>
        <div className={FeedCardStyles.ingredients}>
          {currentIngredients.map((item) => {
            return (
              <div
                className={FeedCardStyles.ingredient}
                style={{ backgroundImage: `url('${item.image_mobile}')` }}
              />
            );
          })}
        </div>
        <div className={FeedCardStyles.icon}>
          <span
            className={`text text_type_digits-default ${FeedCardStyles.price}`}
          >
            {ingredientsTotal}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default ProfileOrderCard;
