import { IBurgerIngredientItem } from "../../helpers/propsTypes/BurgerIngredientItem";

const getFillings = (state: any) => {
  const { burgerIngredients } = state.storeReducer;

  return burgerIngredients.filter(
    (item: IBurgerIngredientItem) => item.type !== "bun",
  );
};

const getBun = (state: any) => {
  const { burgerIngredients } = state.storeReducer;
  return burgerIngredients.filter(
    (item: IBurgerIngredientItem) => item.type === "bun",
  )?.[0];
};

const getIngredientById = (state: any, id: string | undefined) => {
  const { ingredients } = state.storeReducer;

  return ingredients.find((item: IBurgerIngredientItem) => item._id === id);
};

export { getFillings, getBun, getIngredientById };
