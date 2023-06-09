import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useContext, useEffect, useState} from "react";

import BurgerIngredientsStyles from '../styles/BurgerIngredients.module.css'
import {translateTabs} from './../helpers/transcriptions'
import BurgerIngredientItem from "./BurgerIngredientItem";
import {BurgerConstructorContext} from "../services/burgerConstructorContext";



function BurgerIngredients () {
    const burgerConstructorCtx = useContext(BurgerConstructorContext);
    const [selectedType, setSelectedType] = useState("bun");
    const [state, setState] = useState({
        ingredientsByType: [],
        listItemsTemplate: [],
        tabs: []
    })
    useEffect(() => {
        if (!burgerConstructorCtx.data.length) return

        const sortedData = burgerConstructorCtx.data.reduce((acc , item) => {
            if (acc[item.type]) acc[item.type].push(item)
            else acc[item.type] = [item]
            return acc
        }, {})

        const template = Object
            .entries(sortedData)
            .map(([type, items]) => (
                <div className={`${BurgerIngredientsStyles.burgerIngredients} mt-10`} key={type}>
                    <h2 className={`text text_type_main-medium ${BurgerIngredientsStyles.title} mb-6`}>{translateTabs[type]}</h2>
                    <div className={`${BurgerIngredientsStyles.list} pl-1 pr-1`}>
                        {items.map((item) => (
                                <BurgerIngredientItem
                                    className="mb-8"
                                    ingredientItem={item}
                                    key={`ingredient-item-${type}-${item._id}`}
                                    onClick={burgerConstructorCtx.addIngredient}
                                />
                        ))}
                    </div>
                </div>
        ));

        const tabs = Object.keys(sortedData)
            .map(type =>
                <Tab
                    active={selectedType === type}
                    value={type}
                    key={type}
                    onClick={() => selectTab(type)}>
                    {translateTabs[type]}
                </Tab>
            )

        setState({
            ingredientsByType: sortedData,
            selectedType: Object.keys(sortedData)[0],
            listItemsTemplate: template,
            tabs: tabs
        })
    }, [burgerConstructorCtx.data])

    const selectTab = (type) => setSelectedType(type)

    return (
        <div>
            <h1 className={`text text_type_main-large pt-10 ${BurgerIngredientsStyles.title}`}>
                Соберите бургер
            </h1>
            <div className={BurgerIngredientsStyles.tabs}>
                {state.tabs}
            </div>
            <div className={BurgerIngredientsStyles.wrapper}>
                {state.listItemsTemplate}
            </div>
        </div>
    )
}

export default BurgerIngredients