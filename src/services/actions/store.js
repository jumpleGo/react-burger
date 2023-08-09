import { fetchData, order } from "../../api/burgerApi";
import { openModal } from "./modal";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS";

export const ADD_MODAL_INGREDIENT = "ADD_MODAL_INGREDIENT";
export const ADD_ORDER = "ADD_ORDER";

export const CLEAN_MODAL_DATA = "CLEAN_MODAL_DATA";

export const UPDATE_ORDER = "UPDATE_ORDER";

export const getIngredients = () => {
  return function (dispatch) {
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

export const updateOrder = (startIndex, endIndex) => {
  return {
    type: UPDATE_ORDER,
    payload: { startIndex, endIndex },
  };
};

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: ingredient,
  };
};

export const removeIngredient = (index) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: index,
  };
};

export const clearIngredients = () => {
  return {
    type: CLEAR_INGREDIENTS,
  };
};

export const addModalIngredient = (data) => {
  return {
    type: ADD_MODAL_INGREDIENT,
    payload: data,
  };
};

export const addOrder = (ids) => {
  return function (dispatch) {
    order({ ingredients: ids })
      .then((data) => {
        dispatch({
          type: ADD_ORDER,
          payload: {
            content: data,
            type: "order",
            classes: "pt-30 pl-10 pr-10 pb-30",
          },
        });
        dispatch(openModal());
      })
      .catch((err) => console.log(err));
  };
};

export const cleanModalData = () => {
  return {
    type: CLEAN_MODAL_DATA,
  };
};
