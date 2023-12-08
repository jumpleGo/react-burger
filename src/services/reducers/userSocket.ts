import {
  WS_USER_CONNECT,
  WS_USER_ERROR,
  WS_USER_CLOSE,
  WS_USER_MESSAGE,
  TWSActionsUserType,
} from "../actions/userSocket";
import { IOrder } from "../../api/types";

import { IResponseSocketMessage, ISocketOrder } from "../types";

export type TWSUserState = {
  wsConnected: boolean;
  orders: IResponseSocketMessage | null;
  error?: string | undefined;
  currentOrder: IOrder | undefined;
};

const initialState: TWSUserState = {
  wsConnected: false,
  orders: null,
  error: undefined,
  currentOrder: undefined,
};

export const wsUserReducer = (
  state: TWSUserState = initialState,
  action: TWSActionsUserType,
): TWSUserState => {
  switch (action.type) {
    case WS_USER_CONNECT:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_USER_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_USER_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    default:
      return state;
  }
};
