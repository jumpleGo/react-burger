import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";import DragConstructorElementWrapper from "./DragConstructorElementWrapper";import BurgerConstructorStyles from './BurgerConstructor.module.css'import PropTypes from "prop-types";function BurgerConstructor ({onOrderConfirm}) {    return (        <div className={`${BurgerConstructorStyles.burgerConstructor} mt-25`}>            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} >                <ConstructorElement                    extraClass="ml-8"                    type="top"                    isLocked={true}                    text="Краторная булка N-200i (верх)"                    price={200}                    thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"                />                <div className={`${BurgerConstructorStyles.ingredients} pr-4`}>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                    <DragConstructorElementWrapper>                        <ConstructorElement                            extraClass="ml-1"                            text="Краторная булка N-200i (верх)"                            price={50}                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"/>                    </DragConstructorElementWrapper>                </div>                <ConstructorElement                    extraClass="ml-8"                    type="bottom"                    isLocked={true}                    text="Краторная булка N-200i (низ)"                    price={200}                    thumbnail="https://code.s3.yandex.net/react/code/sauce-01-mobile.png"                />            </div>            <div className={`${BurgerConstructorStyles.total} mr-4 mt-10 mb-10`}>                <div className={BurgerConstructorStyles.totalPrice}>                    <span className="text text_type_digits-medium">200</span>                    <CurrencyIcon />                </div>                <Button type="primary" size="large" htmlType="button" extraClass="ml-10" onClick={() => onOrderConfirm()}>                    Оформить заказ                </Button>            </div>        </div>    )}BurgerConstructor.propTypes = {    onOrderConfirm: PropTypes.func.isRequired}export default BurgerConstructor