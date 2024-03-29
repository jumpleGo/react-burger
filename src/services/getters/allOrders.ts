import { IResponseSocketMessage, ISocketOrder, OrderStatus } from "../types";

const getByStatus = (
  orders: IResponseSocketMessage | null,
  status: OrderStatus,
) => {
  let currentIdx = 0;
  return orders?.orders?.reduce(
    (acc: Record<string, ISocketOrder[]>, item: ISocketOrder) => {
      if (item.status !== status) return acc;

      if (!acc[currentIdx]) acc[currentIdx] = [item];
      else if (acc[currentIdx].length < 10) acc[currentIdx].push(item);
      if (acc[currentIdx].length === 10) currentIdx += 1;
      return acc;
    },
    {},
  );
};

export { getByStatus };
