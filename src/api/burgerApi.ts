import { get, post } from "./api";
import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";
import { IOrder } from "./types";
type ResponseBody<T> = {
  data: T;
};
export const fetchData = (): Promise<ResponseBody<IBurgerIngredientItem[]>> => {
  return get("ingredients");
};

export const order = (orderArr: { ingredients: string[] }): Promise<IOrder> => {
  return post("orders", orderArr);
};
