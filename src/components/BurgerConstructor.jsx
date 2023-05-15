import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapper from "./DragConstructorElementWrapper";
import BurgerConstructorStyles from '../styles/BurgerConstructor.module.css'
import PropTypes from "prop-types";
import {BurgerConstructorContext} from "../services/burgerConstructorContext";
import {useContext, useEffect, useReducer, useState} from "react";

function BurgerConstructor () {
    const burgerConstructorCtx = useContext(BurgerConstructorContext);
    const [bun, setBun] = useState({})
    const [filling, setFilling] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const initialState = {
        ids: []
    }
    const reducer = (state, action) => {
        const fillingIds = action?.reduce((acc, item) => {
            acc.push(item._id)
            return acc
        }, [])
        return {
            ids: [...fillingIds, bun._id, bun._id]
        }
    }
    const [idValue, dispatch] = useReducer(reducer, initialState, undefined)

    useEffect(() => {
        if (!burgerConstructorCtx.data?.length) return
        const buns = burgerConstructorCtx.data.filter(item => item.type === 'bun')
        const filling = burgerConstructorCtx.data.filter(item => item.type !== 'bun')

        if(buns.length) setBun(buns[0])
        if(filling.length) {
            dispatch(filling)
            setFilling(filling)
        }
        console.log(buns, filling)
        const totalPrice = buns?.[0]?.price * 2 + filling?.reduce((acc, item) => {
            acc += item?.price
            return acc
        }, 0)
        setTotalPrice(totalPrice)
    }, [burgerConstructorCtx.data])
    return (
        <div className={`${BurgerConstructorStyles.burgerConstructor} mt-25`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} >
                <ConstructorElement
                    extraClass="ml-8"
                    type="top"
                    isLocked={true}
                    text={bun.name + "(верх)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <div className={`${BurgerConstructorStyles.ingredients} pr-4`}>
                    {
                        filling?.map((item) => (
                            <DragConstructorElementWrapper key={item._id}>
                                <ConstructorElement
                                    key={item._id}
                                    extraClass="ml-1"
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}/>
                            </DragConstructorElementWrapper>
                        ))
                    }

                </div>

                <ConstructorElement
                    extraClass="ml-8"
                    type="bottom"
                    isLocked={true}
                    text={bun.name + "(низ)"}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={`${BurgerConstructorStyles.total} mr-4 mt-10 mb-10`}>
                <div className={BurgerConstructorStyles.totalPrice}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" htmlType="button" extraClass="ml-10" onClick={() => burgerConstructorCtx.orderConfirm(idValue.ids)}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor