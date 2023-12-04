import { fetchData, getOrderById, order } from "../../api/burgerApi";
import { CLOSE_MODAL, IOpenModal, openModal } from "./modal";
import { Dispatch } from "react";
import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";
import { IOrder, IPayloadModalInterface } from "../../api/types";
import { ISocketOrder } from "../types";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const CLEAR_INGREDIENTS: "CLEAR_INGREDIENTS" = "CLEAR_INGREDIENTS";

export const ADD_MODAL_INGREDIENT: "ADD_MODAL_INGREDIENT" =
  "ADD_MODAL_INGREDIENT";
export const ADD_ORDER: "ADD_ORDER" = "ADD_ORDER";

export const CLEAN_MODAL_DATA: "CLEAN_MODAL_DATA" = "CLEAN_MODAL_DATA";

export const UPDATE_ORDER: "UPDATE_ORDER" = "UPDATE_ORDER";
export const GET_SINGLE_ORDER: "GET_SINGLE_ORDER" = "GET_SINGLE_ORDER";

interface IGetIngredientSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  payload: IBurgerIngredientItem[];
}

interface IUpdateOrder {
  readonly type: typeof UPDATE_ORDER;
  payload: Record<"startIndex" | "endIndex", number>;
}

interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload: IBurgerIngredientItem;
}

interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  payload: number;
}

interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS;
}

interface ICleanModalData {
  readonly type: typeof CLEAN_MODAL_DATA;
}

interface IAddModalIngredient {
  readonly type: typeof ADD_MODAL_INGREDIENT;
  payload: IPayloadModalInterface<IBurgerIngredientItem>;
}

interface IAddOrder {
  readonly type: typeof ADD_ORDER;
  payload: IPayloadModalInterface<IOrder>;
}

interface IGetSingleOrder {
  readonly type: typeof GET_SINGLE_ORDER;
  payload: IGetOrderByIdResponse;
}

export type IStoreActions =
  | IAddOrder
  | IAddModalIngredient
  | ICleanModalData
  | IAddIngredient
  | IClearIngredients
  | IGetIngredientSuccess
  | IOpenModal
  | IRemoveIngredient
  | IUpdateOrder
  | IGetSingleOrder;

export const getIngredients = () => {
  return function (dispatch: Dispatch<IGetIngredientSuccess>): void {
    fetchData()
      .then((data) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateOrder = (
  startIndex: number,
  endIndex: number,
): IUpdateOrder => {
  return {
    type: UPDATE_ORDER,
    payload: { startIndex, endIndex },
  };
};
export interface IGetOrderByIdResponse {
  success: boolean;
  orders: ISocketOrder[];
}
export const getSingleOrder = (id: string) => {
  return (dispatch: Dispatch<any>): void => {
    getOrderById(id)
      .then((data) => {
        if (data.success && data.orders.length) {
          const order: ISocketOrder = data.orders[0];
          dispatch({
            type: GET_SINGLE_ORDER,
            payload: order,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const addIngredient = (
  ingredient: IBurgerIngredientItem,
): IAddIngredient => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient,
  };
};

export const removeIngredient = (index: number): IRemoveIngredient => {
  return {
    type: REMOVE_INGREDIENT,
    payload: index,
  };
};

export const clearIngredients = (): IClearIngredients => {
  return {
    type: CLEAR_INGREDIENTS,
  };
};

export const addModalIngredient = (
  data: IPayloadModalInterface<IBurgerIngredientItem>,
): IAddModalIngredient => {
  return {
    type: ADD_MODAL_INGREDIENT,
    payload: data,
  };
};

export const addOrder = (ids: string[]) => {
  return function (dispatch: Dispatch<IAddOrder | any>) {
    order({ ingredients: ids })
      .then((data: IOrder) => {
        dispatch({
          type: ADD_ORDER,
          payload: {
            content: data,
            type: "order",
            classes: "pt-30 pl-10 pr-10 pb-30",
          },
        });
      })
      .then(() => dispatch(openModal()))
      .catch((err) => console.log(err));
  };
};

export const cleanModalData = (): ICleanModalData => {
  return {
    type: CLEAN_MODAL_DATA,
  };
};
