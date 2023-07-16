import {BurgerIngredientItemPropsType} from "../helpers/propsTypes/BurgerIngredientItem";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItemStyles from '../styles/BurgetIngredientItem.module.css'
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";

function BurgerIngredientItem({ingredientItem, onClick, count}) {
    const [, dragRef] = useDrag({
        type: 'ingredients',
        item: ingredientItem
    });
    return (
        <div
            ref={dragRef}
            className={BurgerIngredientItemStyles.burgerIngredientItem} onClick={() => onClick(ingredientItem)}>
            <img className={BurgerIngredientItemStyles.image} src={ingredientItem.image} alt='картинка' />
            <div className={`${BurgerIngredientItemStyles.price} pt-1 pb-1`}>
                <span className="text text_type_digits-default">{ingredientItem.price}</span> <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default pb-6">{ingredientItem.name}</p>
            {!!count && <Counter count={count} size="default" extraClass={`${BurgerIngredientItemStyles.counter} m-1`} />}
        </div>
    )
}

BurgerIngredientItem.propsType = {
    ingredientItem: PropTypes.shape(BurgerIngredientItemPropsType),
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired
}

export default BurgerIngredientItem