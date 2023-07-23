import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapper from "./DragConstructorElementWrapper";
import BurgerConstructorStyles from '../styles/BurgerConstructor.module.css'

import { useEffect, useReducer, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient, addOrder, clearIngredients, removeIngredient, updateOrder} from "../services/actions/store";
import {DndProvider, useDrop} from "react-dnd";
import {getBun, getFillings} from "../services/getters/store";
import { v4 as uuidv4 } from 'uuid';



function BurgerConstructor () {
    const dispatch  = useDispatch()
    const [fillingIds, setFillingIds] = useState([])
    const fillings = useSelector(getFillings)
    const bun = useSelector(getBun)
    const { burgerIngredients } = useSelector(state => state.storeReducer)
    const [totalPrice, setTotalPrice] = useState(0)

    const [, dropTarget] = useDrop({
        accept: "ingredients",
        drop(item) {
            const id = uuidv4()
            dispatch(addIngredient({...item, uniqueId: id}))
        },
    });

    useEffect(() => {
        const ids = fillings?.reduce((acc, item) => {
            acc.push(item._id)
            return acc
        }, [])
        setFillingIds([...ids, bun?._id, bun?._id])
    }, [fillings])

    useEffect(() => {
        if (!burgerIngredients?.length) return

        const totalPrice = (bun?.price || 0) * 2 + fillings?.reduce((acc, item) => {
            acc += item?.price
            return acc
        }, 0)
        setTotalPrice(totalPrice)
    }, [fillings, bun])

    const orderConfirm = async () => {
        await dispatch(addOrder(fillingIds))
        dispatch(clearIngredients())


    }

    const removeConstructorItem = (index) => {
        dispatch(removeIngredient(index))
    }

    const [, drop] = useDrop(() => ({
        accept: 'UPDATE_ORDER',
        drop: (item) => {
            return { index: burgerIngredients.length };
        },
    }));

    return (
        <div ref={dropTarget} className={`${BurgerConstructorStyles.burgerConstructor} mt-25`}>
            <div className={BurgerConstructorStyles.wrapper} >
                {bun && <ConstructorElement
                    extraClass="ml-8"
                    type="top"
                    isLocked={true}
                    text={bun.name + "(верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                }

                    <div ref={drop} className={`${BurgerConstructorStyles.ingredients} pr-4`}>

                        {
                            fillings?.map((item, index) => (
                                <DragConstructorElementWrapper key={item.uniqueId} index={index} item={item}>
                                    <ConstructorElement
                                        key={item.uniqueId}
                                        extraClass="ml-1"
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        handleClose={() => removeConstructorItem(index)}/>
                                </DragConstructorElementWrapper>
                            ))
                        }
                    </div>


                { bun && <ConstructorElement
                    extraClass="ml-8"
                    type="bottom"
                    isLocked={true}
                    text={bun.name + "(низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                }
            </div>
            <div className={`${BurgerConstructorStyles.total} mr-4 mt-10 mb-10`}>
                <div className={BurgerConstructorStyles.totalPrice}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" htmlType="button" extraClass="ml-10" onClick={() => orderConfirm()} disabled={!bun}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor