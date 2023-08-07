import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useEffect, useRef, useState} from "react";

import BurgerIngredientsStyles from '../styles/BurgerIngredients.module.css'
import {translateTabs} from './../helpers/transcriptions'
import BurgerIngredientItem from "./BurgerIngredientItem";

import {useSelector, useDispatch} from "react-redux";
import { addModalIngredient } from "../services/actions/store";


import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredientById} from "../services/getters/store";


function BurgerIngredients () {
    const dispatch  = useDispatch()
    const location = useLocation()



    const { ingredients, burgerIngredients } = useSelector((state) => state.storeReducer)

    const [state, setState] = useState({
        ingredientsByType: [],
        listItemsTemplate: [],
    })

    const [tabs, setTabs] = useState([])
    const [sortedIngredients, setSortedIngredients] = useState({})

    const [activeType, setActiveType] = useState('bun');
    const typeRefs = useRef({});
    const navigate = useNavigate()

    const updateTypeRef = useCallback((type, element) => {
        typeRefs.current[type] = element;
    }, []);

    useEffect(() => {
        if (!Object.keys(sortedIngredients).length) return
        const handleIntersect = (entries) => {
            let maxVisibleRatio = 0;
            let maxVisibleType = null;

            entries.forEach((entry) => {
                if (entry.intersectionRatio > maxVisibleRatio) {
                    maxVisibleRatio = entry.intersectionRatio;
                    maxVisibleType = entry.target.id;
                }
            });

            setActiveType(maxVisibleType);
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        });

        Object.values(typeRefs.current).forEach((ref) => {
            observer.observe(ref);
        });

        return () => {
            observer.disconnect();
        }
        
    }, [sortedIngredients])

    useEffect(() => {
        const tabs = Object.keys(sortedIngredients)
            .map(type =>
                <Tab
                    active={activeType === type}
                    value={type}
                    key={type}>
                    {translateTabs[type]}
                </Tab>
            )
        setTabs(tabs)
    }, [activeType, sortedIngredients])

    useEffect(() => {
        if (!ingredients.length) return

        const sortedData = ingredients.reduce((acc , item) => {
            if (acc[item.type]) acc[item.type].push(item)
            else acc[item.type] = [item]
            return acc
        }, {})

        setSortedIngredients(sortedData)


        const template = Object
            .entries(sortedData)
            .map(([type, items]) => (
                <div className={`${BurgerIngredientsStyles.burgerIngredients} mt-10`} key={type} ref={element => updateTypeRef(type, element)} id={type}>
                    <h2 className={`text text_type_main-medium ${BurgerIngredientsStyles.title} mb-6`}>{translateTabs[type]}</h2>
                    <div className={`${BurgerIngredientsStyles.list} pl-1 pr-1`}>
                        {items.map((item) => (
                                <BurgerIngredientItem
                                    className="mb-8"
                                    ingredientItem={item}
                                    key={`ingredient-item-${type}-${item._id}`}
                                    count={getCountById(item._id)}
                                    onClick={() => openModalIngredient(item)}
                                />
                        ))}
                    </div>
                </div>
        ));



        setState({
            ingredientsByType: sortedData,
            selectedType: Object.keys(sortedData)[0],
            listItemsTemplate: template,
        })
    }, [ingredients, activeType, burgerIngredients])


    const openModalIngredient = (content) => {


        dispatch(addModalIngredient({
            content,
            type: 'ingredient',
            classes: 'pt-10 pl-10 pr-10 pb-15'
        }))
        navigate(`/ingredients/${content._id}`, { state: { backgroundLocation: location,
            id: content._id}});
    }

    const getCountById = (id) => {
        return burgerIngredients.filter(item => item._id === id).length
    }

    return (
        <div>
            <h1 className={`text text_type_main-large pt-10 ${BurgerIngredientsStyles.title}`}>
                Соберите бургер
            </h1>
            <div className={BurgerIngredientsStyles.tabs}>
                {tabs}
            </div>
            <div className={BurgerIngredientsStyles.wrapper} id={'wrapper'}>
                {state.listItemsTemplate}
            </div>
        </div>
    )
}

export default BurgerIngredients