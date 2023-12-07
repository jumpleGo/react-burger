import { get, post } from "./api";
import { IBurgerIngredientItem } from "../helpers/propsTypes/BurgerIngredientItem";
import { IOrder } from "./types";
import { IResponseSocketMessage, ISocketOrder } from "../services/types";

type ResponseBody<T> = {
  data: T;
};
export const fetchData = (): Promise<ResponseBody<IBurgerIngredientItem[]>> => {
  return get<ResponseBody<IBurgerIngredientItem[]>>("ingredients");
};

export const order = (orderArr: { ingredients: string[] }): Promise<IOrder> => {
  return post<IOrder>("orders", orderArr);
};

export const getOrderById = (
  orderId: string,
): Promise<IResponseSocketMessage> => {
  return get<IResponseSocketMessage>(`orders/${orderId}`);
};
