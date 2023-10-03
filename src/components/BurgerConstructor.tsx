import React, { Dispatch, useEffect, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElementWrapper from "./DragConstructorElementWrapper";
import BurgerConstructorStyles from "../styles/BurgerConstructor.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  addOrder,
  clearIngredients,
  removeIngredient,
} from "../services/actions/store";
import { DndProvider, useDrop } from "react-dnd";
import { getBun, getFillings } from "../services/getters/store";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../services/utils/cookie";
import { useNavigate } from "react-router-dom";
import { openModal } from "../services/actions/modal";
import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";

type FillingItem = IBurgerIngredientItem & { uniqueId: string };

const BurgerConstructor: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [fillingIds, setFillingIds] = useState<string[]>([]);
  const fillings: FillingItem[] = useSelector(getFillings);
  const bun = useSelector(getBun);
  const { burgerIngredients } = useSelector((state: any) => state.storeReducer);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item: any) {
      const id = uuidv4();
      dispatch(addIngredient({ ...item, uniqueId: id }));
    },
  });

  useEffect(() => {
    const ids = fillings?.reduce((acc: string[], item: FillingItem) => {
      acc.push(item._id);
      return acc;
    }, []);
    setFillingIds([...ids, bun?._id as string, bun?._id as string]);
  }, [fillings, bun]);

  useEffect(() => {
    if (!burgerIngredients?.length) return;

    const totalPrice =
      (bun?.price || 0) * 2 +
      fillings?.reduce((acc: number, item: FillingItem) => {
        acc += item?.price;
        return acc;
      }, 0);
    setTotalPrice(totalPrice);
  }, [fillings, bun]);

  const orderConfirm = async () => {
    if (!getCookie("token")) {
      navigate(`/login/?preorder=true`);
      return;
    }
    await dispatch(addOrder(fillingIds));
    dispatch(clearIngredients());
  };

  const removeConstructorItem = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const [, drop] = useDrop(() => ({
    accept: "UPDATE_ORDER",
    drop: (item: any) => {
      return { index: burgerIngredients.length };
    },
  }));

  return (
    <div
      ref={dropTarget}
      className={`${BurgerConstructorStyles.burgerConstructor} mt-25`}
    >
      <div className={BurgerConstructorStyles.wrapper}>
        {bun && (
          <ConstructorElement
            extraClass="ml-8"
            type="top"
            isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        <div
          ref={drop}
          className={`${BurgerConstructorStyles.ingredients} pr-4`}
        >
          {fillings?.map((item: FillingItem, index: number) => (
            <DragConstructorElementWrapper
              key={item.uniqueId}
              index={index}
              item={item}
            >
              <ConstructorElement
                extraClass="ml-1"
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => removeConstructorItem(index)}
              />
            </DragConstructorElementWrapper>
          ))}
        </div>

        {bun && (
          <ConstructorElement
            extraClass="ml-8"
            type="bottom"
            isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={`${BurgerConstructorStyles.total} mr-4 mt-10 mb-10`}>
        <div className={BurgerConstructorStyles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          extraClass="ml-10"
          onClick={() => orderConfirm()}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
      <div />
    </div>
  );
};

export default BurgerConstructor;
