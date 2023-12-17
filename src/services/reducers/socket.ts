import {
  WS_CONNECT,
  WS_ERROR,
  WS_CLOSE,
  WS_MESSAGE,
  TWSActionsType,
} from "../actions/socket";
import { IOrder } from "../../api/types";
import { IResponseSocketMessage, ISocketOrder } from "../types";

type TWSState = {
  wsConnected: boolean;
  orders: IResponseSocketMessage | null;
  error?: string | undefined;
  currentOrder: IOrder | undefined;
};

export const initialState: TWSState = {
  wsConnected: false,
  orders: null,
  error: undefined,
  currentOrder: undefined,
};

export const wsReducer = (
  state = initialState,
  action: TWSActionsType,
): TWSState => {
  switch (action.type) {
    case WS_CONNECT:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    default:
      return state;
  }
};
