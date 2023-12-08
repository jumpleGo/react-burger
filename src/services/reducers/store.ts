import {
  ADD_INGREDIENT,
  ADD_MODAL_INGREDIENT,
  ADD_ORDER,
  CLEAN_MODAL_DATA,
  CLEAR_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_SINGLE_ORDER,
  IStoreActions,
  REMOVE_INGREDIENT,
  UPDATE_ORDER,
} from "../actions/store";
import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";
import { IOrder } from "../../api/types";
import { IResponseSocketMessage, ISocketOrder } from "../types";

interface IInitialState {
  ingredients: IBurgerIngredientItem[];
  burgerIngredients: IBurgerIngredientItem[];
  currentIngredient: IBurgerIngredientItem | {};
  order: IOrder | {};
  currentSingleOrder: ISocketOrder | null;
}

const initialState: IInitialState = {
  ingredients: [],
  burgerIngredients: [],
  currentIngredient: {},
  order: {},
  currentSingleOrder: null,
};

export const storeReducer = (
  state: IInitialState = initialState,
  action: IStoreActions,
): IInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case UPDATE_ORDER:
      const { startIndex, endIndex } = action.payload;
      const burgerIngredients = [...state.burgerIngredients];
      const [movedItem] = burgerIngredients.splice(startIndex + 1, 1);
      burgerIngredients.splice(endIndex + 1, 0, movedItem);
      return { ...state, burgerIngredients };
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerIngredients:
          action.payload.type === "bun"
            ? state.burgerIngredients.some((item) => item.type === "bun")
              ? state.burgerIngredients.map((item) =>
                  item.type === "bun" ? action.payload : item,
                )
              : [action.payload, ...state.burgerIngredients]
            : [...state.burgerIngredients, action.payload],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        burgerIngredients: state.burgerIngredients.filter(
          (item, index) => index !== action.payload + 1,
        ),
      };
    case ADD_MODAL_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CLEAN_MODAL_DATA:
      return {
        ...state,
        order: {},
        currentIngredient: {},
      };
    case CLEAR_INGREDIENTS:
      return {
        ...state,
        burgerIngredients: [],
      };
    case GET_SINGLE_ORDER:
      return {
        ...state,
        currentSingleOrder: action.payload,
      };
    default:
      return state;
  }
};
