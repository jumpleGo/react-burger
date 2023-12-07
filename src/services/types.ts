export type OrderStatus = "done" | "pending" | "created";
export interface ISocketOrder {
  createdAt: Date;
  ingredients: string[];
  name: string;
  number: number;
  status: OrderStatus;
  updatedAt: Date;
  _id: string;
}

export interface IResponseSocketMessage {
  orders: ISocketOrder[];
  success: boolean;
  total: number;
  totalToday: number;
}
