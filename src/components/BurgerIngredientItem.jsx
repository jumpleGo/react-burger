import {BurgerIngredientItemPropsType} from "../helpers/propsTypes/BurgerIngredientItem";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItemStyles from '../styles/BurgetIngredientItem.module.css'
import PropTypes from "prop-types";

function BurgerIngredientItem({ingredientItem, onClick}) {
    return (
        <div className={BurgerIngredientItemStyles.burgerIngredientItem} onClick={() => onClick(ingredientItem)}>
            <img className={BurgerIngredientItemStyles.image} src={ingredientItem.image} alt='картинка' />
            <div className={`${BurgerIngredientItemStyles.price} pt-1 pb-1`}>
                <span className="text text_type_digits-default">{ingredientItem.price}</span> <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{ingredientItem.name}</p>
        </div>
    )
}

BurgerIngredientItem.propsType = {
    ingredientItem: PropTypes.shape(BurgerIngredientItemPropsType),
    onClick: PropTypes.func.isRequired
}

export default BurgerIngredientItem