import React from "react";
import IngredientDetailsStyles from "../../styles/Modal/IngredientDetails.module.css";
import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";

interface IngredientDetailsProps {
  ingredient: IBurgerIngredientItem;
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({
  ingredient,
}) => {
  return (
    <div className={IngredientDetailsStyles.ingredientDetailsModal}>
      <img
        src={ingredient.image}
        className={IngredientDetailsStyles.image}
        alt="картинка"
      />
      <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
      <div className={`${IngredientDetailsStyles.detailInfo} mt-8`}>
        <div className={IngredientDetailsStyles.detailInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={IngredientDetailsStyles.detailInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={IngredientDetailsStyles.detailInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={IngredientDetailsStyles.detailInfoItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
