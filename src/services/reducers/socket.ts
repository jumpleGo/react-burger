import {
  WS_CONNECT,
  WS_ERROR,
  WS_CLOSE,
  WS_MESSAGE,
  TWSActionsType,
} from "../actions/socket";
import { IOrder } from "../../api/types";

type TWSState = {
  wsConnected: boolean;
  orders: Record<string, any>[];
  error?: Event | undefined;
  currentOrder: IOrder | undefined;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  error: undefined,
  currentOrder: undefined,
};

export const wsReducer = (state = initialState, action: TWSActionsType) => {
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
