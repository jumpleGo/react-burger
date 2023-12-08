import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";
import { RootState } from "../store";

const getFillings = (state: RootState) => {
  const { burgerIngredients } = state.storeReducer;

  return burgerIngredients
    .filter((item: IBurgerIngredientItem) => item.type !== "bun")
    .map((item) => ({ ...item, uniqueId: "" }));
};

const getBun = (state: RootState) => {
  const { burgerIngredients } = state.storeReducer;
  return burgerIngredients.filter(
    (item: IBurgerIngredientItem) => item.type === "bun",
  )?.[0];
};

const getIngredientById = (state: RootState, id: string | undefined) => {
  const { ingredients } = state.storeReducer;

  return ingredients.find((item: IBurgerIngredientItem) => item._id === id);
};

export { getFillings, getBun, getIngredientById };
