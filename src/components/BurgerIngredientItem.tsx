import { FC } from "react";
import { useDrag } from "react-dnd";

import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItemStyles from "../styles/BurgetIngredientItem.module.css";

interface BurgerIngredientItemProps {
  ingredientItem: IBurgerIngredientItem;
  count?: number;
  onClick: (item: IBurgerIngredientItem) => void;
}

const BurgerIngredientItem: FC<BurgerIngredientItemProps> = ({
  ingredientItem,
  onClick,
  count,
}) => {
  const [, dragRef] = useDrag({
    type: "ingredients",
    item: ingredientItem,
  });

  return (
    <div
      ref={dragRef}
      className={BurgerIngredientItemStyles.burgerIngredientItem}
      id="drag_elem"
      onClick={() => onClick(ingredientItem)}
    >
      <img
        className={BurgerIngredientItemStyles.image}
        src={ingredientItem.image}
        alt="картинка"
      />
      <div className={`${BurgerIngredientItemStyles.price} pt-1 pb-1`}>
        <span className="text text_type_digits-default">
          {ingredientItem.price}
        </span>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default pb-6">{ingredientItem.name}</p>
      {!!count && (
        <Counter
          count={count}
          size="default"
          extraClass={`${BurgerIngredientItemStyles.counter} m-1`}
        />
      )}
    </div>
  );
};

export default BurgerIngredientItem;
